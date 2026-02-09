import { LLMOptions, LLMResponse } from "./provider";

const apiKey = process.env.GEMINI_API_KEY;
// Use a model that exists in Google AI (generativelanguage) API: gemini-2.0-flash or gemini-pro
const defaultModel = "gemini-2.0-flash";

export async function generateText(
  prompt: string,
  options?: LLMOptions
): Promise<LLMResponse> {
  const start = Date.now();
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const model = options?.model || defaultModel;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: options?.temperature ?? 0.5,
          maxOutputTokens: options?.maxTokens ?? 2048,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    const e = new Error(err || "Gemini request failed") as Error & { status?: number };
    e.status = res.status;
    throw e;
  }

  const json = await res.json();
  const text =
    json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
  const latency = Date.now() - start;

  return { text, latency, model, cost: 0 };
}
