export interface LLMOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface LLMResponse {
  text: string;
  latency: number;
  cost?: number;
  model?: string;
}

function isQuotaError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  const status = (e as { status?: number })?.status;
  return (
    status === 429 ||
    msg.includes("429") ||
    msg.includes("quota") ||
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.includes("rate limit")
  );
}

export async function generateText(
  prompt: string,
  options?: LLMOptions
): Promise<LLMResponse> {
  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasOpenAI = !!process.env.OPENAI_API_KEY;

  if (hasGemini) {
    try {
      const { generateText: geminiGenerate } = await import("./gemini");
      return await geminiGenerate(prompt, options);
    } catch (e) {
      if (isQuotaError(e) && hasOpenAI) {
        const { generateText: openaiGenerate } = await import("./openai");
        return openaiGenerate(prompt, options);
      }
      throw e;
    }
  }

  if (hasOpenAI) {
    const { generateText: openaiGenerate } = await import("./openai");
    return openaiGenerate(prompt, options);
  }

  throw new Error("Set GEMINI_API_KEY or OPENAI_API_KEY in .env.local");
}
