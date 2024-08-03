import { compile } from "json-schema-to-typescript";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const schemaUrl = url.searchParams.get("schemaUrl");

  if (!schemaUrl) {
    return new Response("No schemaUrl passed", { status: 422 });
  }
  const chunks = schemaUrl.split(".");
  chunks.pop();
  const filename = chunks.join(".");

  try {
    const json = await fetch(schemaUrl).then((res) => res.json());

    const ts = await compile(json, filename, {
      declareExternallyReferenced: false,
      bannerComment: "",
    });

    return new Response(ts, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (e) {
    return new Response("smth went wroong", { status: 500 });
  }
};
