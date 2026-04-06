// Diagram agent eval. Uses Braintrust's Eval() function plus a set of
// deterministic code scorers. The agent itself comes from src/agent-core so
// the eval and the worker can never drift apart.
//
// Run with:
//   npm run eval
//
// Requires BRAINTRUST_API_KEY in .dev.vars (free signup at braintrust.dev).

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
import { Eval } from "braintrust";
import { createOpenAI } from "@ai-sdk/openai";

import { runAgent } from "../src/agent-core";
import { buildMessages, type GoldenTestCase } from "./buildMessages";
import { schemaScorer, type AgentOutput } from "./scorers/schema";
import { structureScorer } from "./scorers/structure";
import { preservationScorer } from "./scorers/preservation";
import { labelKeywordScorer } from "./scorers/labelKeyword";

config({ path: ".dev.vars" });

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

const testCases: GoldenTestCase[] = JSON.parse(
  readFileSync(join("evals", "datasets", "golden.json"), "utf-8")
);

Eval<GoldenTestCase, AgentOutput, GoldenTestCase>("Diagram Agent", {
  // The whole test case becomes both input and expected. The scorers pull
  // out whichever fields they care about (preservedIds, expectedKeywords,
  // expectedCharacteristics, seed elements, etc).
  data: () =>
    testCases.map((tc) => ({
      input: tc,
      expected: tc,
      metadata: {
        id: tc.id,
        difficulty: tc.difficulty,
        category: tc.category,
      },
    })),

  task: async (testCase) => {
    const result = await runAgent({
      model: openai("gpt-5.4-mini"),
      messages: buildMessages(testCase),
    });
    return { text: result.text, elements: result.elements };
  },

  scores: [schemaScorer, structureScorer, preservationScorer, labelKeywordScorer],
});
