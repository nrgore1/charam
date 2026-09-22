"use client";

import { useState } from "react";
import { SITE, LEGAL } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-brass/20 bg-forest-deep py-14 text-parchment/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <Logo variant="dark" className="h-9" />
          <p className="mt-2 max-w-xs text-sm leading-relaxed">
            {SITE.tagline}. Funding girls&rsquo; education through acts of
            gratitude.
          </p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${SITE.email}`} className="underline underline-offset-4 hover:text-saffron">
              {SITE.email}
            </a>
          </p>
        </div>

        <div className="text-sm leading-relaxed">
          <h3 className="font-semibold text-parchment">Registrations & disclosures</h3>
          <p className="mt-3">{LEGAL.usRegistration}</p>
          <p className="mt-1">{LEGAL.inRegistration}</p>
          <p className="mt-3">
            <a href="#" className="underline underline-offset-4 hover:text-saffron">
              Annual reports
            </a>
            {" · "}
            <a href="#" className="underline underline-offset-4 hover:text-saffron">
              Student privacy policy
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-parchment">
            Letters of gratitude, twice a year
          </h3>
          {subscribed ? (
            <p className="mt-3 text-sm" role="status">
              Thank you — you&rsquo;re on the list.
            </p>
          ) : (
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-parchment/30 bg-forest px-4 py-2.5 text-sm text-parchment placeholder:text-parchment/40"
              />
              <button
                type="submit"
                className="rounded-lg bg-saffron px-4 py-2.5 text-sm font-semibold text-forest-deep hover:bg-saffron-deep hover:text-parchment"
              >
                Join
              </button>
            </form>
          )}
          <p className="mt-6 text-xs text-parchment/50">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
