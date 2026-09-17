import { useEffect, useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { eventConfig } from '@/config/event';

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Stadium background */}
      <div className="absolute inset-0 z-0">
        <img
          src={eventConfig.images.heroStadium}
          alt="Football stadium under floodlights"
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* Dark overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Animated stadium light beams */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="light-beam beam-1" />
        <div className="light-beam beam-2" />
        <div className="light-beam beam-3" />
      </div>

      {/* Gold particles */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="gold-particle"
            style={{
              left: `${(i * 5.5 + 3) % 100}%`,
              top: `${(i * 11 + 7) % 100}%`,
              animationDelay: `${(i % 6) * 0.8}s`,
              animationDuration: `${4 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className={`relative z-20 mx-auto max-w-5xl px-4 text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="mb-4 text-xs sm:text-sm font-semibold tracking-[0.4em] text-gold uppercase animate-pulse-slow">
          {eventConfig.brand.subtitle}
        </p>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-[0.9] drop-shadow-2xl">
          NEXUS
          <br />
          <span className="text-gold">VITTORIA</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base md:text-lg font-bold tracking-[0.3em] text-white/90">
          {eventConfig.brand.tagline}
        </p>

        {/* Date & location */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <p className="text-lg sm:text-xl font-bold tracking-widest text-white">
            {eventConfig.event.dateLabel}
          </p>
          <span className="hidden sm:block h-6 w-px bg-gold/40" />
          <p className="flex items-center gap-2 text-sm sm:text-base text-white/80">
            <MapPin className="h-4 w-4 text-gold" />
            {eventConfig.event.venue}
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('#register')}
            className="w-full sm:w-auto rounded-full bg-gold px-8 py-4 text-sm font-bold tracking-wider text-black transition-all hover:bg-gold-bright hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:scale-105"
          >
            REGISTER YOUR TEAM
          </button>
          <button
            onClick={() => scrollTo('#tournament')}
            className="w-full sm:w-auto rounded-full border border-white/30 px-8 py-4 text-sm font-bold tracking-wider text-white transition-all hover:border-gold hover:text-gold hover:bg-gold/5"
          >
            EXPLORE TOURNAMENT
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#countdown')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/60 hover:text-gold transition-colors animate-bounce-slow"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
