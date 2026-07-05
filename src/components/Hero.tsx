"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Countdown from "./Countdown";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 max-w-full overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-accent/10 blur-[100px] sm:blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-5">
        <div className="w-[300px] sm:w-[400px] drop-shadow-[0_0_30px_rgba(179,0,0,0.3)] animate-reveal">
          <Image
            src="/WhatsApp.webp"
            alt="MGHSS"
            width={160}
            height={160}
            className="object-contain w-full h-auto"
            priority
          />
        </div>

        <div className="animate-reveal space-y-1 sm:space-y-2">
          <p className="font-heading text-5xl sm:text-6xl md:text-8xl tracking-wider text-text leading-none">
            Freshers&apos; Day <span className="font-serif-numbers italic">2026</span>
          </p>
          <p className="text-text-secondary text-sm sm:text-base md:text-lg tracking-wide max-w-[260px] sm:max-w-xs mx-auto">
            Every beginning has a story.
            <br />
            This is yours.
          </p>
        </div>

        <div
          className="relative animate-reveal mt-2 sm:mt-4 max-w-full overflow-x-hidden"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/8 via-accent/4 to-accent/8 blur-[50px]" />
          <Countdown sectionVisible={sectionVisible} />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
