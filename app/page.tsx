"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FounderLetter from "@/components/FounderLetter";
import RippleEffect from "@/components/RippleEffect";
import Charities from "@/components/Charities";
import CelebrationGiving from "@/components/CelebrationGiving";
import Transparency from "@/components/Transparency";
import Footer from "@/components/Footer";
import DonateModal from "@/components/DonateModal";

export default function Home() {
  const [donateOpen, setDonateOpen] = useState(false);
  const [dedication, setDedication] = useState("");

  const openDonate = (prefillDedication = "") => {
    setDedication(prefillDedication);
    setDonateOpen(true);
  };

  return (
    <>
      <Navbar onSponsor={() => openDonate()} />
      <main id="main">
        <Hero onSponsor={() => openDonate()} />
        <FounderLetter />
        <RippleEffect />
        <Charities />
        <CelebrationGiving onContinue={openDonate} />
        <Transparency onSponsor={() => openDonate()} />
      </main>
      <Footer />
      <DonateModal
        open={donateOpen}
        initialDedication={dedication}
        onClose={() => setDonateOpen(false)}
      />
    </>
  );
}
