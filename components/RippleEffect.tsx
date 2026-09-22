"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Compass, Users } from "lucide-react";

const STEPS = [
  {
    icon: BookOpen,
    title: "Knowledge & confidence",
    body: "A funded seat in a classroom gives one girl literacy, critical thinking, and the quiet certainty that her mind matters.",
  },
  {
    icon: Compass,
    title: "Independence & choice",
    body: "Education opens work, income, and decisions of her own — breaking a cycle of economic dependence that spans generations.",
  },
  {
    icon: Users,
    title: "A generational legacy",
    body: "An educated mother educates her entire household. When a girl gets educated, an entire family gets educated.",
  },
];

export default function RippleEffect() {
  const reduce = useReducedMotion();

  return (
    <section id="ripple" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display italic text-brass">The ripple effect</p>
          <h2 className="mt-3 font-display text-4xl text-forest sm:text-5xl">
            One education, felt for generations
          </h2>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-saffron bg-saffron-tint font-display text-lg text-saffron-deep">
                  {i + 1}
                </span>
                <step.icon aria-hidden="true" className="h-6 w-6 text-forest" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-forest">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
