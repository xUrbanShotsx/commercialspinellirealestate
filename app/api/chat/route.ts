// TEST MODE — remove this block and uncomment the real handler below once ANTHROPIC_API_KEY is set in Vercel
export async function POST() {
  const TEST_RESPONSE = "This is a test";
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(TEST_RESPONSE));
      controller.close();
    },
  });
  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

// REAL HANDLER — uncomment when ANTHROPIC_API_KEY is set in Vercel:
// import Anthropic from "@anthropic-ai/sdk";
// const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
// const SYSTEM = `You are the Spinelli Commercial AI — a knowledgeable, warm and direct commercial property specialist for Spinelli Real Estate in the Illawarra region of NSW, Australia.
//
// You specialise in commercial real estate: helping business owners find the right premises, landlords lease their assets, and investors acquire income-producing commercial property.
//
// **Your expertise includes:**
// - Commercial sales and leasing across retail, office, industrial and development sites in the Illawarra
// - The local commercial property market across Shellharbour, Kiama, Wollongong, and the South Coast
// - Investment analysis: yield calculations, transfer duty, outgoings, and market commentary
// - The leasing process: heads of agreement, fit-out contributions, make-good provisions, and lease terms
// - The sales process: due diligence, settlement, finance conditions, and stamp duty
//
// **How you communicate:**
// - Concise and confident — answer the question directly, don't pad
// - Warm but professional — commercial property decisions carry real financial weight
// - Use Australian English (storey not story, colour not color)
// - Never make up specific prices, vacancies, or availability — if you don't know, say so and suggest contacting the team directly at info@spinellire.com or 02 4296 0047
//
// If someone asks about buying, explain the commercial purchase process clearly. If they're a tenant, walk them through leasing. If they're an investor, talk yields and market conditions.`;
//
// export async function POST(req: Request) {
//   const { messages } = await req.json();
//   const stream = client.messages.stream({
//     model: "claude-opus-4-5",
//     max_tokens: 1024,
//     system: SYSTEM,
//     messages,
//   });
//   const readable = new ReadableStream({
//     async start(controller) {
//       const encoder = new TextEncoder();
//       stream.on("text", (text) => { controller.enqueue(encoder.encode(text)); });
//       stream.on("error", (err) => { controller.error(err); });
//       stream.on("finalMessage", () => { controller.close(); });
//     },
//   });
//   return new Response(readable, {
//     headers: { "Content-Type": "text/plain; charset=utf-8" },
//   });
// }
