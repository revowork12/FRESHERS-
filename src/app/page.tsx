"use client";

import { useState, useCallback } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Seniors from "@/components/Seniors";
import InstagramCta from "@/components/InstagramCta";
import DustParticles from "@/components/DustParticles";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  const handleComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  return (
    <>
      <Loader onComplete={handleComplete} />

      {showContent && (
        <main className="relative">
          <div className="grain-overlay" />
          <div className="vignette-overlay" />
          <DustParticles />

          <div className="relative z-10">
            <Hero />
            <Seniors />
            <InstagramCta />
          </div>
        </main>
      )}
    </>
  );
}
