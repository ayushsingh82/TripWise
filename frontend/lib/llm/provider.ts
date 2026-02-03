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

export async function generateText(
  prompt: string,
  options?: LLMOptions
): Promise<LLMResponse> {
  const { generateText: openaiGenerate } = await import("./openai");
  return openaiGenerate(prompt, options);
}
