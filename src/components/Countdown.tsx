"use client";

import { useState, useEffect } from "react";

const TARGET = new Date("2026-07-06T03:30:00Z");

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

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft);
      setTick(true);
      setTimeout(() => setTick(false), 150);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div
      className={`flex gap-3 sm:gap-5 justify-center font-numbers text-3xl sm:text-4xl md:text-6xl tracking-wider sm:tracking-widest ${
        tick ? "animate-countdown-tick" : ""
      }`}
    >
      <TimeBlock value={pad(time.days)} label="Days" />
      <span className="text-accent mt-0.5 sm:mt-1">:</span>
      <TimeBlock value={pad(time.hours)} label="Hours" />
      <span className="text-accent mt-0.5 sm:mt-1">:</span>
      <TimeBlock value={pad(time.minutes)} label="Minutes" />
      <span className="text-accent mt-0.5 sm:mt-1">:</span>
      <TimeBlock value={pad(time.seconds)} label="Seconds" />
    </div>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="leading-none">{value}</span>
      <span className="text-[10px] sm:text-xs text-text-secondary tracking-wider mt-1 sm:mt-2 font-body">
        {label}
      </span>
    </div>
  );
}
