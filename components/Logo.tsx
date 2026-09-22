/**
 * The Charam mark: an arched doorway — a threshold into learning —
 * holding a diya flame, the traditional gesture of gratitude.
 */
const VARIANTS = {
  light: { arch: "#1E3B33", word: "text-forest" },
  dark: { arch: "#FAF8F5", word: "text-parchment" },
} as const;

export default function Logo({
  variant = "light",
  withWordmark = true,
  className = "",
}: {
  variant?: keyof typeof VARIANTS;
  withWordmark?: boolean;
  className?: string;
}) {
  const c = VARIANTS[variant];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-full w-auto">
        <path
          d="M14 58 V32 a18 18 0 0 1 36 0 v26"
          stroke={c.arch}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M32 24 c4.5 5.5 6.5 9 6.5 12.5 a6.5 6.5 0 0 1 -13 0 c0-3.5 2-7 6.5-12.5 z"
          fill="#DB8A0C"
        />
        <path d="M22 45 c0 5.5 4.5 9 10 9 s10-3.5 10-9 z" fill="#A5813A" />
      </svg>
      {withWordmark && (
        <span className={`font-display text-2xl leading-none ${c.word}`}>Charam</span>
      )}
    </span>
  );
}
