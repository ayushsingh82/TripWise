import { NextResponse } from "next/server";
import { getOpikClient } from "@/lib/opik/client";

export const runtime = "nodejs";

/**
 * GET /api/metrics
 * TripWise metrics & Opik observability (same pattern as encodehack).
 * Returns metrics structure for the metrics dashboard; actual data is in Opik.
 */
export async function GET() {
  const opikEnabled = !!getOpikClient();

  return NextResponse.json({
    metrics: [
      { name: "Trips generated", value: 0, unit: "trips", trend: "stable" as const, opikTracked: true },
      { name: "Itinerary items completed", value: 0, unit: "items", trend: "stable" as const, opikTracked: true },
      { name: "Variant A (detailed) usage", value: 0, unit: "%", trend: "stable" as const, strategy: "A" },
      { name: "Variant B (compact) usage", value: 0, unit: "%", trend: "stable" as const, strategy: "B" },
    ],
    summary: {
      opikEnabled,
      message: opikEnabled
        ? "Trip generation and item actions are logged to Opik. View traces and metrics in your Opik project."
        : "Set OPIK_API_KEY to enable full observability.",
    },
    opikObservabilityEnabled: opikEnabled,
  });
}
