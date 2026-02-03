import { getOpikClient } from "./client";

export interface MetricData {
  name: string;
  value: number;
  tags?: Record<string, string>;
}

export async function logMetric(data: MetricData) {
  const client = getOpikClient();
  if (!client) {
    console.log("[Opik Metric]", data);
    return;
  }
  // Opik metrics API if available
  console.log("[Opik Metric]", data);
}

export async function logTripItemCompleted(tripId: string, itemId: string) {
  await logMetric({ name: "trip_item_completed", value: 1, tags: { trip_id: tripId, item_id: itemId } });
}

export async function logTripItemImportant(tripId: string, itemId: string) {
  await logMetric({ name: "trip_item_important", value: 1, tags: { trip_id: tripId, item_id: itemId } });
}
