import * as yaml from "yaml";

export const config = {
  matcher: "/:path*.yaml",
};

type SupportedFormat = "json" | "yaml";

const convertFormat = (data: any, toFormat: SupportedFormat): string =>
  toFormat === "json" ? JSON.stringify(data, null, 2) : yaml.stringify(data);

const parseContent = (content: string, format: SupportedFormat): any =>
  format === "json" ? JSON.parse(content) : yaml.parse(content);

export default async function middleware(
  request: Request,
): Promise<Response | undefined> {
  const url = new URL(request.url);
  const requestedFormat = url.pathname.split(".").pop() as SupportedFormat;

  if (requestedFormat !== "yaml" && requestedFormat !== "json") {
    return;
  }

  const alternateFormat: SupportedFormat =
    requestedFormat === "yaml" ? "json" : "yaml";
  const alternateUrl = `${url.origin}${url.pathname.replace(
    requestedFormat,
    alternateFormat,
  )}`;

  const response = await fetch(alternateUrl);
  if (!response.ok) {
    return;
  }

  const rawContent = await response.text();
  const content = parseContent(rawContent, alternateFormat);
  const convertedContent = convertFormat(content, requestedFormat);

  return new Response(convertedContent, {
    headers: {
      "Content-Type": `${
        requestedFormat === "json" ? "application/json" : "text/yaml"
      }; charset=utf-8`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
