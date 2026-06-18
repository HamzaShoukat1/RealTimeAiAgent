import "dotenv/config";

import { AIChatAgent } from "@cloudflare/ai-chat";
import { convertToModelMessages, streamText, stepCountIs } from "ai";
import { createGroq } from "@ai-sdk/groq"
import { tools } from "./Tools"

import { streamAgent } from "./agent-core";
import { compactHistory } from "./context/compaction";
import { SYSTEM_PROMPT } from "./system-prompt.ts"

interface Env extends Cloudflare.Env {
  GROQ_API_KEY: string;
  // TAVILY_API_KEY: string;
  // UPSTASH_VECTOR_REST_URL: string;
  // UPSTASH_VECTOR_REST_TOKEN: string;
};


export class DesignAgent extends AIChatAgent<Env> {
  async onChatMessage() {
    const groq = createGroq({ apiKey: this.env.GROQ_API_KEY });
    const model = groq("openai/gpt-oss-120b");

    // Compact older history if the conversation has gotten long. The recent
    // few turns stay verbatim; everything older is collapsed into one
    // summary system message.
    // const allMessages = await convertToModelMessages(this.messages);
    // const messages = await compactHistory(allMessages, { model });
    const messages = await convertToModelMessages(this.messages)


  try {
      const result = streamText({
      model,
      messages,
      tools,
      stopWhen: stepCountIs(5),
      providerOptions: { groq: { strictJsonSchema: false } }, // Groq's strict JSON schema validation is currently too strict for our use case, so we disable it. We should re-enable it once Groq supports a more flexible schema. See

    });
    
    return result.toUIMessageStreamResponse();
  } catch (error) {
   console.error("❌ HIDDEN AI API ERROR DETAILS:", error);
      throw error;
    
  }

  }
}
