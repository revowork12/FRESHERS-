"use client";

import { useRef, useCallback } from "react";
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
  const swipeStartX = useRef(0);

  const { sectionRef, currentStep, completed, goToPrev, goToNext } = useStepScroll({
    totalSteps: SENIORS.length,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!completed) return;
    swipeStartX.current = e.touches[0].clientX;
  }, [completed]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!completed) return;
    const deltaX = e.changedTouches[0].clientX - swipeStartX.current;
    if (deltaX > 50) {
      goToPrev();
    } else if (deltaX < -50) {
      goToNext();
    }
  }, [completed, goToPrev, goToNext]);

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

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[380px] h-[50vh] max-h-[460px] sm:w-[420px] sm:h-[520px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SENIORS.map((senior, index) => (
          <SeniorCard
            key={index}
            {...senior}
            isActive={currentStep === index}
          />
        ))}
      </div>

      <div
        className={`absolute bottom-14 sm:bottom-20 left-0 right-0 flex justify-center z-20 transition-opacity duration-500 ${
          completed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
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

      <div
        className={`absolute bottom-40 sm:bottom-48 left-0 right-0 flex justify-center z-20 pointer-events-none transition-opacity duration-500 ${
          completed ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="animate-scroll-indicator">
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none" className="text-white/60">
            <path d="M10 0v26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M2 18l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
