"use client";

import { useState, useEffect } from "react";

const TARGET = new Date("2026-07-06T05:00:00Z");

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown({ sectionVisible = true }: { sectionVisible?: boolean }) {
  const [time, setTime] = useState(getTimeLeft);
  const [tick, setTick] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft);
      setTick(true);
      setTimeout(() => setTick(false), 150);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionVisible) setRevealed(false);
  }, [sectionVisible]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div
      className={`group relative cursor-pointer select-none rounded-[20px] overflow-hidden transition-all duration-500 ease-out ${
        revealed
          ? "border-accent/30 shadow-[0_0_20px_rgba(179,0,0,0.3)]"
          : "border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,.18)]"
      }`}
      onClick={() => setRevealed(true)}
    >
      <div
        className={`rounded-[20px] transition-all duration-500 ease-out ${
          revealed
            ? "bg-transparent backdrop-blur-none backdrop-saturate-100"
            : "bg-white/12 backdrop-blur-[100px] backdrop-saturate-125"
        }`}
      >
        <div
          className={`absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-500 ${
            revealed ? "opacity-0" : ""
          }`}
          style={{
            boxShadow:
              "inset 0 1px rgba(255,255,255,0.2), inset 0 -1px rgba(255,255,255,0.06)",
          }}
        />

        <div
          className={`absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-500 ${
            revealed ? "opacity-0" : ""
          }`}
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.08) 100%)",
          }}
        />

        <div
          className={`absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-500 ${
            revealed ? "opacity-0" : "opacity-[0.04]"




          }`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="px-5 py-6 sm:px-8 sm:py-7 relative z-10">
          <div className={`flex gap-3 sm:gap-5 justify-center font-numbers text-3xl sm:text-4xl md:text-6xl tracking-wider sm:tracking-widest transition-all duration-500 ease-out will-change-transform ${
            revealed
              ? "opacity-100 scale-100"
              : "opacity-5 scale-[0.60]"
          }`}>
            <TimeBlock value={pad(time.days)} label="Days" tick={tick} />
            <span className="text-accent mt-0.5 sm:mt-1">:</span>
            <TimeBlock value={pad(time.hours)} label="Hours" tick={tick} />
            <span className="text-accent mt-0.5 sm:mt-1">:</span>
            <TimeBlock value={pad(time.minutes)} label="Minutes" tick={tick} />
            <span className="text-accent mt-0.5 sm:mt-1">:</span>
            <TimeBlock value={pad(time.seconds)} label="Seconds" tick={tick} />
          </div>
        </div>

        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none transition-opacity duration-500 z-10 ${
          revealed ? "opacity-0" : "opacity-100"
        }`}>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/6 backdrop-blur-[4px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
            <span className="font-body text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/60 font-medium">tap to reveal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeBlock({ value, label, tick }: { value: string; label: string; tick?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span className={`leading-none${tick ? " animate-countdown-tick" : ""}`}>
        {value}
      </span>
      <span className="text-[10px] sm:text-xs text-text-secondary tracking-wider mt-1 sm:mt-2 font-body">
        {label}
      </span>
    </div>
  );
}
