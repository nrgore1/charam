/**
 * Arched image frame — the site's signature motif, echoing a temple doorway.
 * Renders a respectful gradient placeholder; swap the inner div for next/image
 * with real, consented photography before launch.
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
      <div
        aria-hidden="true"
        className="rounded-arch border border-brass/40 bg-gradient-to-b from-saffron-tint via-[#EFD9B4] to-forest/20 shadow-[0_24px_60px_-30px_rgba(30,59,51,0.45)]"
        style={{ aspectRatio: "4 / 5" }}
      />
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink-soft">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
