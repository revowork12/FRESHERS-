export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="text-xs text-text-secondary tracking-widest uppercase">
        Scroll
      </span>
      <svg
        width="20"
        height="28"
        viewBox="0 0 20 28"
        fill="none"
        className="animate-scroll-indicator"
      >
        <rect
          x="1"
          y="1"
          width="18"
          height="26"
          rx="9"
          stroke="#A6A6A6"
          strokeWidth="1.5"
        />
        <circle cx="10" cy="8" r="2.5" fill="#F5F5F5" />
      </svg>
    </div>
  );
}
