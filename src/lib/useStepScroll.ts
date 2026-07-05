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
  const touchPrevY = useRef(0);
  const pendingRelease = useRef(false);

  function lockBody() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  function unlockBody() {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }

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
      unlockBody();
      onComplete();
    }
  }, [currentStep, totalSteps, goToStep, onComplete]);

  const actUp = useCallback(() => {
    if (currentStep > 0) {
      pendingRelease.current = false;
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  function tryLock(down: boolean) {
    if (consumed.current || isLocked.current || !down) return false;
    const section = sectionRef.current;
    if (!section) return false;
    const rect = section.getBoundingClientRect();
    if (rect.top < 0) {
      isLocked.current = true;
      lockBody();
      window.scrollTo({ top: rect.top + window.scrollY });
      return true;
    }
    return false;
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!consumed.current && !isLocked.current && e.deltaY > 0) {
        if (tryLock(true)) {
          e.preventDefault();
          return;
        }
      }
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
      touchPrevY.current = e.touches[0].clientY;
      scrollAccum.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const dy = touchPrevY.current - currentY;
      touchPrevY.current = currentY;

      if (!consumed.current && !isLocked.current && dy > 0) {
        if (tryLock(true)) {
          e.preventDefault();
          return;
        }
      }
      if (consumed.current || !isLocked.current) return;
      e.preventDefault();
      scrollAccum.current += dy;

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

  useEffect(() => {
    return () => {
      unlockBody();
    };
  }, []);

  return { sectionRef, currentStep };
}
