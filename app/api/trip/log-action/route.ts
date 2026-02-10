import { NextRequest, NextResponse } from "next/server";
import { logTrace } from "@/lib/opik/logTrace";
import { logTripItemCompleted, logTripItemImportant } from "@/lib/opik/logMetric";
import { opikClientSafe } from "@/lib/opik/client";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { tripId, itemId, action, variant } = await request.json();

    if (!tripId || !itemId || !action) {
      return NextResponse.json(
        { error: "tripId, itemId, and action are required" },
        { status: 400 }
      );
    }

    const validActions = ["done", "important", "pending"];
    if (!validActions.includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await logTrace(
      {
        trip_id: tripId,
        item_id: itemId,
        action,
        variant: variant ?? undefined,
      },
      "trip_item_action"
    );

    if (action === "done") {
      await logTripItemCompleted(tripId, itemId);
    } else if (action === "important") {
      await logTripItemImportant(tripId, itemId);
    }

    await opikClientSafe.flush();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Log action error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
