import { getOpikClient } from "./client";

export interface TraceData {
  user_id?: string;
  trip_id?: string;
  item_id?: string;
  prompt?: string;
  response?: string;
  variant?: string;
  latency?: number;
  cost?: number;
  output_items?: number;
  action?: string;
  [key: string]: unknown;
}

export async function logTrace(
  data: TraceData,
  name: string = "trip_plan_generation"
) {
  try {
    const client = getOpikClient();
    if (!client) {
      console.log("[Opik Trace]", name, data);
      return;
    }
    const trace = client.trace({
      name,
      input: { prompt: data.prompt, variant: data.variant },
      output: {
        response: data.response,
        output_items: data.output_items ?? 0,
        action: data.action,
      },
      metadata: {
        user_id: data.user_id,
        trip_id: data.trip_id,
        item_id: data.item_id,
        latency_ms: data.latency,
        cost: data.cost,
      },
    });
    trace?.end?.();
    await client.flush?.();
  } catch (e) {
    console.error("Opik logTrace error:", e);
  }
}
