"use client";

export default function InstagramCta() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[200px] sm:h-[300px] bg-accent/5 blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="relative z-10 space-y-8 sm:space-y-10">
        <div className="space-y-3">
          <p className="font-heading text-5xl sm:text-6xl md:text-7xl tracking-wider text-text animate-pulse-glow leading-none">
            See You on <span className="font-serif-numbers italic">6</span> July
          </p>
          <p className="text-text-secondary text-sm sm:text-base tracking-wide">
            We&apos;re excited to welcome you.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-wider text-text">
            Stay Updated
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-xs mx-auto leading-relaxed">
            Follow our Instagram for announcements and updates.
          </p>
          <a
            href="https://www.instagram.com/_gaandhaara/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-accent text-text font-body text-sm font-medium tracking-wide transition-all duration-300 hover:bg-accent/80 hover:shadow-[0_0_30px_rgba(179,0,0,0.5)] active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
            </svg>
            Follow @_gaandhaara_
          </a>
        </div>
      </div>
    </section>
  );
}
