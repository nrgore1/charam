"use client";

import { motion, useReducedMotion } from "framer-motion";
import ArchFrame from "./ArchFrame";

export default function Hero({ onSponsor }: { onSponsor: () => void }) {
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative overflow-hidden">
      {/* Ripple rings — quiet echo of the mission's central metaphor */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] text-saffron/20"
        viewBox="0 0 100 100"
        fill="none"
      >
        {[18, 30, 42].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} stroke="currentColor" strokeWidth="0.5" />
        ))}
      </svg>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[7fr_5fr] lg:py-24">
        <div>
          <motion.p {...fade(0)} className="font-display italic text-brass">
            A gratitude initiative for girls&rsquo; education
          </motion.p>
          <motion.h1
            {...fade(0.12)}
            className="mt-4 font-display text-5xl leading-[1.05] text-forest sm:text-6xl lg:text-7xl"
          >
            Giving gratitude a&nbsp;purpose.
          </motion.h1>
          <motion.p
            {...fade(0.24)}
            className="mt-6 max-w-measure text-lg leading-relaxed text-ink-soft"
          >
            Charam transforms prayer, celebration, and thanksgiving into an
            enduring gift: educating a girl whose family cannot afford school.
            The blessing you give returns, generation after generation.
          </motion.p>
          <motion.div {...fade(0.36)} className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onSponsor}
              className="rounded-full bg-forest px-7 py-3.5 font-semibold text-parchment transition-colors hover:bg-forest-deep"
            >
              Sponsor a student
            </button>
            <a
              href="#story"
              className="font-semibold text-forest underline decoration-saffron decoration-2 underline-offset-4 hover:text-saffron-deep"
            >
              Read our story
            </a>
          </motion.div>
        </div>

        <motion.div {...fade(0.3)}>
          <ArchFrame caption="A desk, a book, a beginning — one sponsored seat changes a whole family's story." />
        </motion.div>
      </div>
    </section>
  );
}
