/**
 * Arched hero artwork: a girl reading at dawn beside a lit diya.
 * Original vector illustration in the brand palette; replace with
 * consented photography later if desired by swapping the svg for next/image.
 */
export default function ArchFrame({
  caption,
  className = "",
}: {
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 400 500"
        role="img"
        aria-label="Illustration of a girl reading a book at dawn beside a lit diya"
        className="w-full rounded-arch border border-brass/40 shadow-[0_24px_60px_-30px_rgba(30,59,51,0.45)]"
      >
        <defs>
          <linearGradient id="charam-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FDF4E3" />
            <stop offset="0.5" stopColor="#F7E3B8" />
            <stop offset="1" stopColor="#EFCC8F" />
          </linearGradient>
          <radialGradient id="charam-sun" cx="0.5" cy="0.45" r="0.6">
            <stop offset="0" stopColor="#F5CE85" />
            <stop offset="1" stopColor="#E9A94F" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill="url(#charam-sky)" />
        <circle cx="200" cy="320" r="230" fill="none" stroke="#DB8A0C" strokeOpacity="0.10" strokeWidth="1.5" />
        <circle cx="200" cy="320" r="190" fill="none" stroke="#DB8A0C" strokeOpacity="0.14" strokeWidth="1.5" />
        <circle cx="200" cy="320" r="150" fill="none" stroke="#DB8A0C" strokeOpacity="0.18" strokeWidth="1.5" />
        <circle cx="200" cy="320" r="118" fill="url(#charam-sun)" opacity="0.92" />
        <path d="M84 118 q9 -9 18 0 q9 -9 18 0" fill="none" stroke="#A5813A" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        <path d="M272 86 q7 -7 14 0 q7 -7 14 0" fill="none" stroke="#A5813A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <circle cx="330" cy="150" r="4" fill="#DB8A0C" opacity="0.35" />
        <circle cx="352" cy="196" r="2.5" fill="#DB8A0C" opacity="0.3" />
        <circle cx="62" cy="200" r="3" fill="#DB8A0C" opacity="0.3" />
        <path d="M0 402 C 90 378, 310 378, 400 402 L400 500 L0 500 Z" fill="#33544A" />
        <path d="M142 386 C160 366 240 366 258 386 C232 393 168 393 142 386 Z" fill="#16302A" />
        <path d="M174 386 C172 338 180 316 200 316 C220 316 228 338 226 386 Z" fill="#16302A" />
        <circle cx="200" cy="298" r="17" fill="#16302A" />
        <circle cx="214" cy="291" r="8" fill="#16302A" />
        <path d="M177 337 Q185 358 200 361" fill="none" stroke="#16302A" strokeWidth="9" strokeLinecap="round" />
        <path d="M223 337 Q215 358 200 361" fill="none" stroke="#16302A" strokeWidth="9" strokeLinecap="round" />
        <path d="M200 362 C188 352 172 351 163 356 L163 343 C172 337 188 338 200 347 Z" fill="#FAF8F5" stroke="#E4D8C2" strokeWidth="1" />
        <path d="M200 362 C212 352 228 351 237 356 L237 343 C228 337 212 338 200 347 Z" fill="#FAF8F5" stroke="#E4D8C2" strokeWidth="1" />
        <path d="M200 347 L200 362" stroke="#D8C9AC" strokeWidth="1.5" />
        <path d="M292 412 c0 8 6.5 12 13 12 s13 -4 13 -12 z" fill="#C97B12" />
        <circle cx="305" cy="398" r="9" fill="#F0A93C" opacity="0.3" />
        <path d="M305 388 c3.5 4.5 5.5 7.5 5.5 10 a5.5 5.5 0 0 1 -11 0 c0 -2.5 2 -5.5 5.5 -10 z" fill="#F0A93C" />
        <g opacity="0.95">
          <circle cx="118" cy="424" r="6" fill="#E8A020" /><circle cx="118" cy="424" r="2.6" fill="#B26B05" />
          <circle cx="96" cy="444" r="5" fill="#E8A020" /><circle cx="96" cy="444" r="2.2" fill="#B26B05" />
          <circle cx="308" cy="438" r="5.5" fill="#E8A020" /><circle cx="308" cy="438" r="2.4" fill="#B26B05" />
        </g>
      </svg>
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink-soft">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
