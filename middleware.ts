import * as yaml from "yaml";

export const config = {
  matcher: ["/:path*.json", "/:path*.yaml"],
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
  // Check if we're handling the original request or a recursive call
  if (request.headers.get("X-Original-Format") !== null) {
    // If it's a recursive call, return the response as-is
    return;
  }

  if (requestedFormat !== "yaml" && requestedFormat !== "json") {
    return;
  }

  const alternateFormat: SupportedFormat =
    requestedFormat === "yaml" ? "json" : "yaml";
  const alternateUrl = `${url.origin}${url.pathname.replace(
    requestedFormat,
    alternateFormat,
  )}`;

  // Use the modified headers in the fetch request
  const response = await fetch(alternateUrl, {
    headers: { "X-Original-Format": requestedFormat },
  });

  if (!response.ok) {
    return;
  }

  const rawContent = await response.text();
  const content = parseContent(rawContent, alternateFormat);
  const convertedContent = convertFormat(content, requestedFormat);
  const mediaType =
    requestedFormat === "json" ? "application/json" : "text/yaml";

  return new Response(convertedContent, {
    headers: {
      "Content-Type": `${mediaType}; charset=utf-8`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
