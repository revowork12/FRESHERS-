"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const SCROLL_THRESHOLD = 150;

export function useStepScroll({ totalSteps, onComplete }: { totalSteps: number; onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const consumed = useRef(false);
  const isLocked = useRef(false);
  const isTransitioning = useRef(false);
  const scrollAccum = useRef(0);
  const touchStartY = useRef(0);
  const touchPrevY = useRef(0);
  const lastScrollY = useRef(0);
  const pendingRelease = useRef(false);

  const goToStep = useCallback(
    (step: number) => {
      if (isTransitioning.current) return;
      if (step < 0 || step >= totalSteps) return;
      isTransitioning.current = true;
      setCurrentStep(step);
      setTimeout(() => {
        isTransitioning.current = false;
      }, 700);
    },
    [totalSteps]
  );

  const actDown = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    } else if (!pendingRelease.current) {
      pendingRelease.current = true;
    } else {
      consumed.current = true;
      isLocked.current = false;
      onComplete();
    }
  }, [currentStep, totalSteps, goToStep, onComplete]);

  const actUp = useCallback(() => {
    if (currentStep > 0) {
      pendingRelease.current = false;
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (consumed.current || isLocked.current) return;
      const rect = section.getBoundingClientRect();
      const scrollingDown = window.scrollY > lastScrollY.current;
      lastScrollY.current = window.scrollY;
      if (scrollingDown && rect.top <= 0) {
        isLocked.current = true;
        window.scrollTo({ top: window.scrollY + rect.top });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (consumed.current || !isLocked.current) return;
      e.preventDefault();
      scrollAccum.current += e.deltaY;

      if (scrollAccum.current >= SCROLL_THRESHOLD) {
        scrollAccum.current = 0;
        actDown();
      } else if (scrollAccum.current <= -SCROLL_THRESHOLD) {
        scrollAccum.current = 0;
        actUp();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [actDown, actUp]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchPrevY.current = e.touches[0].clientY;
      scrollAccum.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (consumed.current || !isLocked.current) return;
      e.preventDefault();

      const currentY = e.touches[0].clientY;
      scrollAccum.current += touchPrevY.current - currentY;
      touchPrevY.current = currentY;

      if (scrollAccum.current >= SCROLL_THRESHOLD) {
        scrollAccum.current = 0;
        actDown();
      } else if (scrollAccum.current <= -SCROLL_THRESHOLD) {
        scrollAccum.current = 0;
        actUp();
      }
    };

    const handleTouchEnd = () => {
      scrollAccum.current = 0;
    };

    section.addEventListener("touchstart", handleTouchStart, { passive: true });
    section.addEventListener("touchmove", handleTouchMove, { passive: false });
    section.addEventListener("touchend", handleTouchEnd);
    return () => {
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchmove", handleTouchMove);
      section.removeEventListener("touchend", handleTouchEnd);
    };
  }, [actDown, actUp]);

  return { sectionRef, currentStep };
}
