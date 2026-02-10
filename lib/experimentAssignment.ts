/**
 * A/B experiment assignment for TripWise (same pattern as encodehack).
 * Assigns itinerary style variant: "detailed" (A) vs "compact" (B).
 * Deterministic hash so same tripId always gets same variant.
 */

export type ItineraryVariant = "A" | "B";

export const VARIANT_LABELS: Record<ItineraryVariant, string> = {
  A: "Detailed (more suggestions, longer descriptions)",
  B: "Compact (focused list, shorter descriptions)",
};

export function assignTripVariant(tripId: string): ItineraryVariant {
  let hash = 0;
  for (let i = 0; i < tripId.length; i++) hash += tripId.charCodeAt(i);
  return hash % 2 === 0 ? "A" : "B";
}

/** Prompt hint for LLM based on variant (for A/B testing). */
export function getVariantPromptHint(variant: ItineraryVariant): string {
  if (variant === "A") {
    return " Style: detailed – include 10–14 items with clear, descriptive text and practical tips.";
  }
  return " Style: compact – include 6–10 items with short, actionable text.";
}
