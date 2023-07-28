export const runtime = "edge";

export default function Cors () {
  return new Response(
    "Hello World!",
    {
      status: 200,
      headers: {
        "Test-Original-Headers": "PASS"
      }
    }
  );
}
