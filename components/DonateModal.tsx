"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { CHARITIES, type Currency } from "@/lib/site";
import { outboundUrl, recordEvent } from "@/lib/track";

const AMOUNTS: Record<Currency, number[]> = {
  USD: [60, 250, 400],
  INR: [5000, 21000, 33000],
};

type Step = "form" | "after" | "done";

export default function DonateModal({
  open,
  initialDedication,
  onClose,
}: {
  open: boolean;
  initialDedication: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("form");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [amount, setAmount] = useState<number>(250);
  const [custom, setCustom] = useState("");
  const [dedication, setDedication] = useState("");
  const [pledgeId, setPledgeId] = useState("");
  const [chosenOrg, setChosenOrg] = useState("");
  const [org, setOrg] = useState(CHARITIES[0].name);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setDedication(initialDedication);
      setStep("form");
      setPledgeId("");
      setChosenOrg("");
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
  const selectedCharity = CHARITIES.find((c) => c.name === org);

  const choose = (orgName: string) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now());
    setPledgeId(id);
    setChosenOrg(orgName);
    recordEvent("pledge", {
      id,
      org: orgName,
      amount: finalAmount,
      currency,
      frequency,
      dedication,
      source: "modal",
    });
    setStep("after");
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
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-parchment p-7 shadow-2xl sm:p-9"
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

        {step === "form" && (
          <form className="mt-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
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

            <label className="block text-sm">
              <span className="font-semibold text-ink">Give through</span>
              <select
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="mt-2 w-full rounded-lg border border-brass/40 bg-white px-4 py-3 text-ink"
              >
                {CHARITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} — {new URL(c.url).hostname.replace("www.", "")}
                  </option>
                ))}
              </select>
              <span className="mt-2 block text-xs leading-relaxed text-ink-soft">
                You pay the organization directly on their secure site — Charam
                never handles your money.
              </span>
            </label>

            {finalAmount > 0 && selectedCharity ? (
              <a
                href={outboundUrl(selectedCharity.url)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => choose(org)}
                className="block w-full rounded-full bg-saffron py-3.5 text-center font-semibold text-forest-deep transition-colors hover:bg-saffron-deep hover:text-parchment"
              >
                Give {symbol}
                {finalAmount.toLocaleString()}
                {frequency === "monthly" ? "/month" : ""} via {org}
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="w-full rounded-full bg-saffron py-3.5 font-semibold text-forest-deep opacity-50"
              >
                Enter an amount to continue
              </button>
            )}
          </form>
        )}

        {step === "after" && (
          <div className="mt-6" role="status">
            <p className="leading-relaxed text-ink-soft">
              We&rsquo;ve opened <strong className="text-forest">{chosenOrg}</strong> in
              a new tab — complete your gift of {symbol}
              {finalAmount.toLocaleString()} there
              {dedication ? `, dedicated to ${dedication}` : ""}. When
              you&rsquo;re done, let us know so we can count your gratitude:
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  recordEvent("confirmed", {
                    ref: pledgeId,
                    org: chosenOrg,
                    amount: finalAmount,
                    currency,
                  });
                  setStep("done");
                }}
                className="rounded-full bg-forest px-6 py-3 font-semibold text-parchment hover:bg-forest-deep"
              >
                I completed my donation
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-brass/40 px-6 py-3 font-semibold text-ink-soft hover:border-forest"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="mt-6" role="status">
            <p className="font-display text-2xl text-saffron-deep">
              Thank you for your gratitude.
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Your gift through {chosenOrg} will carry a girl&rsquo;s education
              forward. May the blessing return to you many times over.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-forest px-6 py-3 font-semibold text-parchment"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
