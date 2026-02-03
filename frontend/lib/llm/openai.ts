import { LLMOptions, LLMResponse } from "./provider";

const apiKey = process.env.OPENAI_API_KEY;

export async function generateText(
  prompt: string,
  options?: LLMOptions
): Promise<LLMResponse> {
  const start = Date.now();
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: options?.model || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: options?.temperature ?? 0.6,
      max_tokens: options?.maxTokens ?? 1500,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "OpenAI request failed");
  }

  const json = await res.json();
  const text = json.choices?.[0]?.message?.content ?? "";
  const latency = Date.now() - start;

  return { text, latency, model: json.model, cost: 0 };
}
