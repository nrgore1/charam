"use client";

import { ExternalLink } from "lucide-react";
import { CHARITIES } from "@/lib/site";
import { outboundUrl, recordEvent } from "@/lib/track";

export default function Charities() {
  return (
    <section id="give" className="bg-sand py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display italic text-brass">Give directly</p>
          <h2 className="mt-3 font-display text-4xl text-forest sm:text-5xl">
            Trusted organizations doing this work today
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Charam is young. While we build our own sponsorship pipeline, we
            encourage you to give directly to proven organizations advancing
            girls&rsquo; education across India.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {CHARITIES.map((c) => (
            <li
              key={c.name}
              className="flex flex-col rounded-2xl border border-brass/30 bg-parchment p-7"
            >
              <h3 className="font-display text-2xl text-forest">{c.name}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
                {c.blurb}
              </p>
              <a
                href={outboundUrl(c.url)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  recordEvent("outbound_click", { org: c.name, source: "charities-section" })
                }
                className="mt-5 inline-flex items-center gap-2 self-start font-semibold text-forest underline decoration-saffron decoration-2 underline-offset-4 hover:text-saffron-deep"
              >
                Donate at {new URL(c.url).hostname.replace("www.", "")}
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-ink-soft">
          These organizations are independent of Charam; links are provided so
          your gratitude can reach a classroom today.
        </p>
      </div>
    </section>
  );
}
