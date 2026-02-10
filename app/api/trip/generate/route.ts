import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/llm/provider";
import { TRIP_PLAN_PROMPT } from "@/lib/prompts";
import { opikClientSafe } from "@/lib/opik/client";
import { logTrace } from "@/lib/opik/logTrace";
import { assignTripVariant, getVariantPromptHint } from "@/lib/experimentAssignment";

export const runtime = "nodejs";

function parseItemsFromText(text: string): { id: string; text: string; priority: "high" | "medium" | "low" }[] {
  const items: { id: string; text: string; priority: "high" | "medium" | "low" }[] = [];
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (Array.isArray(parsed)) {
        parsed.forEach((item: { id?: unknown; text?: string; summary?: string; priority?: string }, i: number) => {
          items.push({
            id: String(item.id ?? i + 1),
            text: item.text || item.summary || "",
            priority: (["high", "medium", "low"].includes(item.priority ?? "") ? item.priority : "medium") as "high" | "medium" | "low",
          });
        });
      }
    }
  } catch (_) {}
  if (items.length === 0) {
    items.push({ id: "1", text: "Review and book main transport", priority: "high" });
    items.push({ id: "2", text: "Reserve accommodation", priority: "high" });
    items.push({ id: "3", text: "Plan key activities", priority: "medium" });
  }
  return items;
}

export async function POST(request: NextRequest) {
  const trace = opikClientSafe.trace({ name: "trip_plan_flow" });

  try {
    const body = await request.json();
    const { prompt, from, to, dates, budget, preferredStyle } = body;
    const input = [prompt, from && `From: ${from}`, to && `To: ${to}`, dates && `Dates: ${dates}`, budget && `Budget: ${budget}`]
      .filter(Boolean)
      .join("\n");

    if (!input.trim()) {
      return NextResponse.json({ error: "Prompt or destination is required" }, { status: 400 });
    }

    const tripId = `trip-${Date.now()}`;
    const variant = preferredStyle === "A" || preferredStyle === "B" ? preferredStyle : assignTripVariant(tripId);
    const styleHint = getVariantPromptHint(variant);

    trace.update?.({ input: { prompt: input, variant } });

    const fullPrompt = TRIP_PLAN_PROMPT.replace("{{input}}", input).replace("{{styleHint}}", styleHint);
    const start = Date.now();
    const response = await generateText(fullPrompt, { temperature: 0.5, maxTokens: 1500 });
    const latency = Date.now() - start;

    const items = parseItemsFromText(response.text);

    await logTrace({
      prompt: input,
      response: response.text,
      latency,
      output_items: items.length,
      trip_id: tripId,
      variant,
    }, "trip_plan_generation");

    trace.update?.({ output: { tripId, itemCount: items.length, variant } });
    trace.end?.();
    await opikClientSafe.flush();

    return NextResponse.json({
      tripId,
      from: from || "",
      to: to || "",
      dates: dates || "",
      budget: budget || "",
      variant,
      items: items.map((it) => ({ ...it, status: "pending", important: false })),
    });
  } catch (error) {
    console.error("Trip generate error:", error);
    trace.update?.({ output: { error: String(error) } });
    trace.end?.();
    await opikClientSafe.flush();
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate trip" },
      { status: 500 }
    );
  }
}
