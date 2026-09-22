"use client";

import Logo from "./Logo";

const LINKS = [
  { href: "#story", label: "Our story" },
  { href: "#ripple", label: "The ripple effect" },
  { href: "#give", label: "Where to give" },
  { href: "#dedicate", label: "Dedicate a gift" },
  { href: "#transparency", label: "Transparency" },
];

export default function Navbar({ onSponsor }: { onSponsor: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-brass/20 bg-parchment/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-forest focus:px-4 focus:py-2 focus:text-parchment"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <a href="#main" aria-label="Charam — home">
          <Logo className="h-9" />
        </a>
        <ul className="hidden items-center gap-6 text-sm text-ink-soft md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-forest">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onSponsor}
          className="rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-forest-deep shadow-sm transition-colors hover:bg-saffron-deep hover:text-parchment"
        >
          Sponsor a student
        </button>
      </nav>
    </header>
  );
}
