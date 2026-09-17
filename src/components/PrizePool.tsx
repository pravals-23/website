import { useInView } from '@/hooks/useInView';
import { Lock, Trophy } from 'lucide-react';

export default function PrizePool() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative bg-black py-20 sm:py-28 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs font-bold tracking-[0.4em] text-gold mb-4">
          THE PRIZE POOL
        </p>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8">
          IT'S A <span className="text-gold">SURPRISE</span>
        </h2>

        {/* Locked prize visual */}
        <div
          className={`relative mx-auto w-full max-w-md rounded-3xl border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent p-10 transition-all duration-1000 ${
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          {/* Shimmer */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute -inset-x-full h-full bg-gradient-to-r from-transparent via-gold/10 to-transparent animate-shimmer" />
          </div>

          <div className="relative">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/40 bg-black/40">
              <Lock className="h-10 w-10 text-gold animate-pulse-slow" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="h-6 w-6 text-gold" />
              <p className="font-display text-2xl font-black tracking-widest text-white">
                PRIZE POOL
              </p>
            </div>
            <p className="text-sm font-bold tracking-[0.3em] text-gold">
              REVEALED SOON
            </p>
          </div>
        </div>

        <p className="mt-8 text-base text-white/60">
          The prize pool will be revealed soon.
        </p>
      </div>
    </section>
  );
}
