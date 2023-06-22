export const runtime = "edge";

export default function NoCors () {
  return new Response("Hello World!", { status: 200 });
}
