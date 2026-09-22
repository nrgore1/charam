import { SITE } from "@/lib/site";

export default function FounderLetter() {
  return (
    <section id="story" className="bg-sand py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="font-display italic text-brass">A letter from our founders</p>
        <h2 className="mt-3 font-display text-4xl text-forest sm:text-5xl">
          Why Charam exists
        </h2>

        <div className="mt-10 space-y-6 border-l-2 border-saffron/60 pl-6 text-lg leading-relaxed text-ink sm:pl-8">
          <p>
            In our home, gratitude has always had a shape — a festival prepared
            for weeks, a pooja offered in thanks, a celebration shared with
            everyone we love. One year, we asked ourselves a simple question:
            what if the money we set aside for these moments could become a
            blessing that outlives the day itself?
          </p>
          <p>
            That question became Charam. We now divert what we would spend on
            rituals of thanksgiving directly into tuition fees for girls whose
            families cannot afford school. The prayer is still offered. The
            celebration still happens. But it lasts — in a girl who learns to
            read, to question, to choose her own path.
          </p>
          <p>
            Charam is our way of saying thank you to God for giving us this
            long life and for all the opportunities and blessings we have
            received along the way. We invite you to make your gratitude
            last, too.
          </p>
        </div>

        <div className="mt-10">
          <p aria-hidden="true" className="font-display text-3xl italic text-forest">
            {SITE.founderName}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{SITE.founderRole}</p>
        </div>
      </div>
    </section>
  );
}
