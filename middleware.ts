import * as yaml from "yaml";
import { marked } from "marked";
import TurndownService from "turndown";

export const config = {
  matcher: ["/:path*.json", "/:path*.yaml", "/:path*.html"],
};

type SupportedFormat = "json" | "yaml" | "md" | "html";

const mapperObject: Record<SupportedFormat, SupportedFormat> = {
  json: "yaml",
  yaml: "json",
  md: "html",
  html: "md",
};

const convertFormat = async (
  data: any,
  fromFormat: SupportedFormat,
  toFormat: SupportedFormat,
): Promise<string> => {
  if (fromFormat === "json" && toFormat === "yaml") {
    return yaml.stringify(data);
  } else if (fromFormat === "yaml" && toFormat === "json") {
    return JSON.stringify(data, null, 2);
  } else if (fromFormat === "md" && toFormat === "html") {
    return marked(data);
  } else {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(data);
    return markdown;
  }
};

const parseContent = (content: string, format: SupportedFormat): any => {
  switch (format) {
    case "json":
      return JSON.parse(content);
    case "yaml":
      return yaml.parse(content);
    case "md":
    case "html":
      return content; // No parsing needed for md or html
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

export default async function middleware(
  request: Request,
): Promise<Response | undefined> {
  const url = new URL(request.url);
  const requestedFormat = url.pathname.split(".").pop() as SupportedFormat;

  if (request.headers.get("X-Original-Format") !== null) {
    return;
  }

  if (!(requestedFormat in mapperObject)) {
    return;
  }

  const alternateFormat = mapperObject[requestedFormat];

  const alternateUrl = `${url.origin}${url.pathname.replace(
    requestedFormat,
    alternateFormat,
  )}`;

  const response = await fetch(alternateUrl, {
    // needed to avoid infinite loop
    headers: { "X-Original-Format": requestedFormat },
  });

  if (!response.ok) {
    return;
  }

  const rawContent = await response.text();
  const content = parseContent(rawContent, alternateFormat);
  const convertedContent = await convertFormat(
    content,
    alternateFormat,
    requestedFormat,
  );

  const mediaType = {
    json: "application/json",
    yaml: "text/yaml",
    html: "text/html",
    md: "text/markdown",
  }[requestedFormat];

  return new Response(convertedContent, {
    headers: {
      "Content-Type": `${mediaType}; charset=utf-8`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
