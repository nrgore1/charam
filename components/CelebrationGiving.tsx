"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { OCCASIONS, type Occasion } from "@/lib/site";

function certificateSvg(occasion: Occasion, honoree: string, giver: string) {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
  <rect width="1200" height="850" fill="#FAF8F5"/>
  <rect x="40" y="40" width="1120" height="770" fill="none" stroke="#A5813A" stroke-width="3"/>
  <rect x="56" y="56" width="1088" height="738" fill="none" stroke="#DB8A0C" stroke-width="1.5"/>
  <g transform="translate(568,96)">
    <path d="M6 56 V30 a26 26 0 0 1 52 0 v26" fill="none" stroke="#A5813A" stroke-width="3" stroke-linecap="round"/>
    <path d="M32 20 c4.5 5.5 6.5 9 6.5 12.5 a6.5 6.5 0 0 1 -13 0 c0-3.5 2-7 6.5-12.5 z" fill="#DB8A0C"/>
    <path d="M22 42 c0 5.5 4.5 9 10 9 s10-3.5 10-9 z" fill="#A5813A"/>
  </g>
  <text x="600" y="240" text-anchor="middle" font-family="Georgia, serif" font-size="52" fill="#1E3B33">Certificate of Gratitude</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#A5813A">Charam — Giving Gratitude a Purpose</text>
  <text x="600" y="410" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#28231D">In honor of ${esc(occasion.toLowerCase())}</text>
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="#1E3B33">${esc(honoree || "A cherished blessing")}</text>
  <text x="600" y="560" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#5A5347">a gift of education has been dedicated${giver ? ` by ${esc(giver)}` : ""},</text>
  <text x="600" y="600" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#5A5347">so that one girl's schooling may carry this gratitude forward.</text>
  <text x="600" y="720" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="22" fill="#A5813A">${date}</text>
</svg>`;
}

export default function CelebrationGiving({
  onContinue,
}: {
  onContinue: (dedication: string) => void;
}) {
  const [occasion, setOccasion] = useState<Occasion>(OCCASIONS[0]);
  const [honoree, setHonoree] = useState("");
  const [giver, setGiver] = useState("");

  const dedication = useMemo(
    () => `${occasion} — ${honoree || "unnamed"}${giver ? `, from ${giver}` : ""}`,
    [occasion, honoree, giver]
  );

  const download = () => {
    const blob = new Blob([certificateSvg(occasion, honoree, giver)], {
      type: "image/svg+xml",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "charam-certificate-of-gratitude.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="dedicate" className="bg-forest py-20 text-parchment sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="font-display italic text-saffron">Celebration-based giving</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">
            Dedicate your gift to a moment of thanks
          </h2>
          <p className="mt-6 max-w-measure leading-relaxed text-parchment/80">
            A birthday, a festival, an answered prayer — dedicate a scholarship
            in its honor and receive a certificate of gratitude to keep or to
            give.
          </p>

          <form
            className="mt-10 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              onContinue(dedication);
            }}
          >
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-parchment/90">
                What are you giving thanks for?
              </legend>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOccasion(o)}
                    aria-pressed={occasion === o}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      occasion === o
                        ? "border-saffron bg-saffron text-forest-deep"
                        : "border-parchment/30 text-parchment/85 hover:border-saffron/70"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="font-semibold text-parchment/90">
                  In honor / thanksgiving of
                </span>
                <input
                  value={honoree}
                  onChange={(e) => setHonoree(e.target.value)}
                  placeholder="e.g., Amma's 80th birthday"
                  className="mt-2 w-full rounded-lg border border-parchment/30 bg-forest-deep px-4 py-3 text-parchment placeholder:text-parchment/40 focus:border-saffron"
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold text-parchment/90">
                  Your name (optional)
                </span>
                <input
                  value={giver}
                  onChange={(e) => setGiver(e.target.value)}
                  placeholder="Shown on the certificate"
                  className="mt-2 w-full rounded-lg border border-parchment/30 bg-forest-deep px-4 py-3 text-parchment placeholder:text-parchment/40 focus:border-saffron"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="submit"
                className="rounded-full bg-saffron px-6 py-3 font-semibold text-forest-deep transition-colors hover:bg-saffron-deep hover:text-parchment"
              >
                Continue to sponsor
              </button>
              <button
                type="button"
                onClick={download}
                className="inline-flex items-center gap-2 rounded-full border border-parchment/40 px-6 py-3 font-semibold text-parchment transition-colors hover:border-saffron"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Download certificate
              </button>
            </div>
          </form>
        </div>

        {/* Live certificate preview */}
        <div aria-label="Certificate preview" className="self-center">
          <div className="rounded-lg border-4 border-brass bg-parchment p-8 text-center text-ink shadow-2xl">
            <div className="border border-saffron/70 px-6 py-10">
              <svg
                aria-hidden="true"
                viewBox="0 0 64 64"
                fill="none"
                className="mx-auto h-12 w-12"
              >
                <path
                  d="M14 58 V32 a18 18 0 0 1 36 0 v26"
                  stroke="#A5813A"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M32 24 c4.5 5.5 6.5 9 6.5 12.5 a6.5 6.5 0 0 1 -13 0 c0-3.5 2-7 6.5-12.5 z"
                  fill="#DB8A0C"
                />
                <path d="M22 45 c0 5.5 4.5 9 10 9 s10-3.5 10-9 z" fill="#A5813A" />
              </svg>
              <p className="mt-6 font-display text-2xl text-forest">
                Certificate of Gratitude
              </p>
              <p className="mt-1 font-display text-sm italic text-brass">
                Charam — Giving Gratitude a Purpose
              </p>
              <p className="mt-8 text-sm text-ink-soft">
                In honor of {occasion.toLowerCase()}
              </p>
              <p className="mt-2 font-display text-xl text-forest">
                {honoree || "A cherished blessing"}
              </p>
              <p className="mx-auto mt-6 max-w-xs text-xs leading-relaxed text-ink-soft">
                a gift of education has been dedicated
                {giver ? ` by ${giver}` : ""}, so that one girl&rsquo;s
                schooling may carry this gratitude forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
