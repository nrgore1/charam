"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { TIERS, LEGAL, type Currency } from "@/lib/site";

const fmt = (n: number, c: Currency) =>
  c === "USD" ? `$${n.toLocaleString("en-US")}` : `₹${n.toLocaleString("en-IN")}`;

export default function Transparency({ onSponsor }: { onSponsor: () => void }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <section id="transparency" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-display italic text-brass">Transparency</p>
            <h2 className="mt-3 font-display text-4xl text-forest sm:text-5xl">
              Where every gift goes
            </h2>
          </div>
          <div
            role="group"
            aria-label="Currency"
            className="flex rounded-full border border-brass/40 p-1 text-sm"
          >
            {(["USD", "INR"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                aria-pressed={currency === c}
                className={`rounded-full px-4 py-1.5 transition-colors ${
                  currency === c
                    ? "bg-forest text-parchment"
                    : "text-ink-soft hover:text-forest"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.title}
              className="flex flex-col rounded-2xl border border-brass/30 bg-white/60 p-7"
            >
              <p className="font-display text-4xl text-saffron-deep">
                {fmt(currency === "USD" ? t.usd : t.inr, currency)}
              </p>
              <h3 className="mt-3 font-display text-2xl text-forest">{t.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{t.funds}</p>
              <button
                type="button"
                onClick={onSponsor}
                className="mt-6 self-start font-semibold text-forest underline decoration-saffron decoration-2 underline-offset-4 hover:text-saffron-deep"
              >
                Give this
              </button>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 rounded-2xl bg-saffron-tint p-8 sm:flex-row sm:items-start">
          <ShieldCheck aria-hidden="true" className="h-8 w-8 shrink-0 text-saffron-deep" />
          <div>
            <h3 className="font-display text-2xl text-forest">The 100% promise</h3>
            <p className="mt-3 max-w-measure leading-relaxed text-ink">
              Every donated rupee and dollar goes directly to partner schools as
              tuition, kits, and lab access. Our small administrative costs are
              covered separately by the founding family — never from your gift.
            </p>
            <p className="mt-4 max-w-measure text-sm leading-relaxed text-ink-soft">
              {LEGAL.disclosure} Annual progress reports are published each
              April.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
