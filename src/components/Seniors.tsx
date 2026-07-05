"use client";

import { useCallback } from "react";
import { useStepScroll } from "@/lib/useStepScroll";
import SeniorCard from "./SeniorCard";

const SENIORS = [
  {
    name: "Senior 1",
    position: "To be confirmed",
    quote: "Excited to welcome the new batch!",
    imageUrl: "/WhatsApp%20(5).webp",
  },
  {
    name: "Senior 2",
    position: "To be confirmed",
    quote: "This is going to be an amazing journey.",
    imageUrl: "/WhatsApp%20(3).webp",
  },
  {
    name: "Senior 3",
    position: "To be confirmed",
    quote: "Welcome to the family!",
    imageUrl: "/WhatsApp%20(2).webp",
  },
  {
    name: "Senior 4",
    position: "To be confirmed",
    quote: "Get ready for the best years of your life.",
    imageUrl: "/WhatsApp%20(1).webp",
  },
];

export default function Seniors() {
  const scrollToNext = useCallback(() => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  const { sectionRef, currentStep } = useStepScroll({
    totalSteps: SENIORS.length,
    onComplete: scrollToNext,
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-dark"
    >
      <div className="absolute top-8 sm:top-12 left-0 right-0 z-10 text-center">
        <h2 className="font-heading text-4xl sm:text-5xl tracking-wider text-text mb-1">
          Meet Your Seniors
        </h2>
        <p className="text-text-secondary text-xs sm:text-sm tracking-wide">
          Meet them
        </p>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[380px] h-[50vh] max-h-[460px] sm:w-[420px] sm:h-[520px]">
        {SENIORS.map((senior, index) => (
          <SeniorCard
            key={index}
            {...senior}
            isActive={currentStep === index}
          />
        ))}
      </div>

      <div className="absolute bottom-14 sm:bottom-20 left-0 right-0 flex justify-center z-20">
        <div className="flex gap-3">
          {SENIORS.map((_, index) => (
            <div
              key={index}
              className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 border border-white/10 ${
                currentStep === index
                  ? "w-6 sm:w-7 bg-accent border-accent shadow-[0_0_8px_rgba(179,0,0,0.6)]"
                  : "w-2.5 sm:w-3 bg-white/30 border-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center z-20">
        <div className="animate-scroll-indicator flex flex-col items-center gap-0.5">
          <span className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-white/25 font-body">scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/25">
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
