"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { type Currency } from "@/lib/site";

const AMOUNTS: Record<Currency, number[]> = {
  USD: [60, 250, 400],
  INR: [5000, 21000, 33000],
};

export default function DonateModal({
  open,
  initialDedication,
  onClose,
}: {
  open: boolean;
  initialDedication: string;
  onClose: () => void;
}) {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [amount, setAmount] = useState<number>(250);
  const [custom, setCustom] = useState("");
  const [dedication, setDedication] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setDedication(initialDedication);
      setSubmitted(false);
      dialogRef.current?.focus();
    }
  }, [open, initialDedication]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const finalAmount = custom ? Number(custom) || 0 : amount;
  const symbol = currency === "USD" ? "$" : "₹";

  const handleContinue = () => {
    // Integration point: create a Stripe Checkout session or Razorpay order
    // with { frequency, currency, amount: finalAmount, dedication }.
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest-deep/60 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-parchment p-7 shadow-2xl sm:p-9"
      >
        <div className="flex items-start justify-between">
          <h2 id="donate-title" className="font-display text-3xl text-forest">
            Sponsor a student
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-ink-soft hover:bg-sand"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div role="status" className="mt-8">
            <p className="font-display text-2xl text-saffron-deep">
              Thank you for your gratitude.
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              This is where secure payment opens ({currency === "USD" ? "Stripe" : "Razorpay"}).
              Your {frequency === "monthly" ? "monthly " : ""}gift of {symbol}
              {finalAmount.toLocaleString()}
              {dedication ? `, dedicated to ${dedication},` : ""} is ready to
              change a girl&rsquo;s story.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-forest px-6 py-3 font-semibold text-parchment"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            className="mt-6 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Frequency">
              {(
                [
                  ["once", "Give once"],
                  ["monthly", "Give monthly"],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFrequency(val)}
                  aria-pressed={frequency === val}
                  className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    frequency === val
                      ? "border-forest bg-forest text-parchment"
                      : "border-brass/40 text-ink-soft hover:border-forest"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Amount</span>
              <div role="group" aria-label="Currency" className="flex rounded-full border border-brass/40 p-0.5 text-xs">
                {(["USD", "INR"] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCurrency(c);
                      setAmount(AMOUNTS[c][1]);
                      setCustom("");
                    }}
                    aria-pressed={currency === c}
                    className={`rounded-full px-3 py-1 ${
                      currency === c ? "bg-forest text-parchment" : "text-ink-soft"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {AMOUNTS[currency].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => {
                    setAmount(a);
                    setCustom("");
                  }}
                  aria-pressed={!custom && amount === a}
                  className={`rounded-xl border px-3 py-3 font-semibold transition-colors ${
                    !custom && amount === a
                      ? "border-saffron bg-saffron-tint text-saffron-deep"
                      : "border-brass/40 text-ink-soft hover:border-saffron"
                  }`}
                >
                  {symbol}
                  {a.toLocaleString()}
                </button>
              ))}
            </div>

            <label className="block text-sm">
              <span className="font-semibold text-ink">Custom amount</span>
              <input
                inputMode="numeric"
                value={custom}
                onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder={`${symbol}…`}
                className="mt-2 w-full rounded-lg border border-brass/40 bg-white px-4 py-3"
              />
            </label>

            <label className="block text-sm">
              <span className="font-semibold text-ink">
                In honor / thanksgiving of (optional)
              </span>
              <input
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                placeholder="A birthday, a festival, a prayer of thanks…"
                className="mt-2 w-full rounded-lg border border-brass/40 bg-white px-4 py-3"
              />
            </label>

            <button
              type="submit"
              disabled={finalAmount <= 0}
              className="w-full rounded-full bg-saffron py-3.5 font-semibold text-forest-deep transition-colors hover:bg-saffron-deep hover:text-parchment disabled:opacity-50"
            >
              Continue to secure payment — {symbol}
              {finalAmount.toLocaleString()}
              {frequency === "monthly" ? "/month" : ""}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
