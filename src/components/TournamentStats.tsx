import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { eventConfig } from '@/config/event';

interface Stat {
  value: number;
  display: string;
  label: string;
  suffix?: string;
}

const STATS: Stat[] = [
  { value: 20, display: '20', label: 'TEAMS' },
  { value: 2, display: '2', label: 'DAYS' },
  { value: 1, display: '1', label: 'CHAMPION' },
  { value: 17, display: '17–18', label: 'OCTOBER' },
];

function AnimatedNumber({ value }: { value: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{n}</span>;
}

export default function TournamentStats() {
  const [sectionRef, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative bg-gradient-to-b from-black via-neutral-950 to-black py-20 sm:py-28">
      <div
        ref={sectionRef}
        className="mx-auto max-w-6xl px-4"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative text-center transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative">
                <div className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-gold leading-none">
                  {stat.display.includes('–') ? (
                    stat.display
                  ) : (
                    <AnimatedNumber value={stat.value} />
                  )}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-12 bg-gold/40 rounded-full" />
              </div>
              <p className="mt-5 text-xs sm:text-sm font-bold tracking-[0.25em] text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
