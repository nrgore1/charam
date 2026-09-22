"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  clearPending,
  loadPending,
  recordEvent,
  type PendingPledge,
} from "@/lib/track";

/**
 * Greets a returning donor who clicked out to a partner organization but
 * hasn't confirmed yet. Persists across tabs, reloads, and revisits (48h).
 */
export default function ConfirmBanner({ suppressed }: { suppressed: boolean }) {
  const [pending, setPending] = useState<PendingPledge | null>(null);
  const [hidden, setHidden] = useState(false);
  const [thanked, setThanked] = useState(false);

  useEffect(() => {
    setPending(loadPending());
  }, [suppressed]);

  if (!pending || hidden || suppressed) return null;
  const symbol = pending.currency === "USD" ? "$" : "₹";

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-xl rounded-2xl border border-brass/40 bg-parchment p-5 shadow-2xl"
    >
      {thanked ? (
        <p className="font-display text-lg text-saffron-deep">
          Thank you — your gift has been counted.
        </p>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <p className="leading-relaxed text-ink">
              Welcome back! Did you complete your gift of{" "}
              <strong>
                {symbol}
                {pending.amount.toLocaleString()}
              </strong>{" "}
              to {pending.org}?
            </p>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => {
                clearPending();
                setHidden(true);
              }}
              className="rounded-full p-1.5 text-ink-soft hover:bg-sand"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                recordEvent("confirmed", {
                  ref: pending.id,
                  org: pending.org,
                  amount: pending.amount,
                  currency: pending.currency,
                });
                clearPending();
                setThanked(true);
                setTimeout(() => setHidden(true), 4000);
              }}
              className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-forest-deep"
            >
              Yes, I completed it
            </button>
            <button
              type="button"
              onClick={() => setHidden(true)}
              className="rounded-full border border-brass/40 px-5 py-2.5 text-sm font-semibold text-ink-soft hover:border-forest"
            >
              Not yet
            </button>
          </div>
        </>
      )}
    </div>
  );
}
