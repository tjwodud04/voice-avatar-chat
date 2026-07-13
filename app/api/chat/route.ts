import { streamText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { loadKnowledgeBase, buildSystemPrompt } from "@/lib/knowledge";
import { GROQ_MODEL } from "@/lib/config";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Load knowledge base and build system prompt
    const knowledge = await loadKnowledgeBase();
    const systemPrompt = buildSystemPrompt(knowledge);

    const result = streamText({
      model: groq(GROQ_MODEL),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate response" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
