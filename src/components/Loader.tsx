"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const LINES = [
  "Initializing...",
  "Decrypting Files...",
  "██████████  100%",
  "Access Granted.",
  "MGHSS Chadayamangalam",
  "Freshers' Day Database Unlocked",
];

const CHAR_SPEED = 30;
const LINE_PAUSE = 250;
const FINAL_PAUSE = 600;

function haptic(ms: number) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(ms);
  }
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lineIndexRef = useRef(0);
  const charCountRef = useRef(0);

  const currentLine = LINES[lineIndex];

  useEffect(() => {
    if (lineIndex >= LINES.length) return;

    const interval = setInterval(() => {
      charCountRef.current += 1;
      setCharCount(charCountRef.current);

      if (charCountRef.current > currentLine.length) {
        clearInterval(interval);
        haptic(8);

        const pause = lineIndex === LINES.length - 1 ? FINAL_PAUSE : LINE_PAUSE;

        setTimeout(() => {
          const nextLine = lineIndexRef.current + 1;
          if (nextLine >= LINES.length) {
            setFinished(true);
            setTimeout(() => {
              setHidden(true);
              setTimeout(onComplete, 600);
            }, 600);
          } else {
            lineIndexRef.current = nextLine;
            charCountRef.current = 0;
            setLineIndex(nextLine);
            setCharCount(0);
          }
        }, pause);
      }
    }, CHAR_SPEED);

    return () => clearInterval(interval);
  }, [lineIndex, currentLine, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark transition-opacity duration-600 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="font-mono text-sm sm:text-base text-text-secondary space-y-2 w-[300px] max-w-[85vw]">
        {LINES.map((line, index) => {
          const isActive = index === lineIndex;
          const isPast = index < lineIndex;
          const typedChars = isActive
            ? line.slice(0, charCount)
            : isPast
            ? line
            : "";
          const showCursor = isActive && charCount <= line.length;
          const isDone = finished && index === LINES.length - 1;

          return (
            <p
              key={index}
              className={`transition-opacity duration-300 ${
                isPast || isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              {typedChars}
              {showCursor && (
                <span className="inline-block w-[2px] h-[1em] ml-0.5 bg-accent align-middle animate-blink" />
              )}
              {isDone && (
                <span className="inline-block ml-1 text-accent">▮</span>
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}
