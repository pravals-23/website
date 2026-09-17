import { useCountdown } from '@/hooks/useCountdown';
import { eventConfig } from '@/config/event';
import { Calendar, Clock } from 'lucide-react';

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-b from-gold/15 to-transparent border border-gold/30 flex items-center justify-center overflow-hidden">
        <span className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-gold tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent" />
      </div>
      <span className="mt-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/60">
        {label}
      </span>
    </div>
  );
}

export default function RegistrationCountdown() {
  const time = useCountdown(eventConfig.registration.opensAt);

  return (
    <section
      id="countdown"
      className="relative bg-black py-20 sm:py-28 overflow-hidden"
    >
      {/* Glow accent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {time.isOver ? (
          <>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="text-xs font-bold tracking-widest text-gold">LIVE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
              REGISTRATION IS NOW <span className="text-gold">OPEN</span>
            </h2>
            <button
              onClick={() =>
                document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="mt-6 rounded-full bg-gold px-10 py-4 text-sm font-bold tracking-wider text-black transition-all hover:bg-gold-bright hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:scale-105"
            >
              REGISTER YOUR TEAM
            </button>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 mb-6">
              <Calendar className="h-4 w-4 text-gold" />
              <span className="text-xs font-bold tracking-widest text-gold">
                REGISTRATION OPENS SUNDAY
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
              20 TEAMS. <span className="text-gold">ONE TOURNAMENT.</span>{' '}
              <span className="text-white">ONE CHAMPION.</span>
            </h2>
            <p className="mb-10 flex items-center justify-center gap-2 text-sm text-white/60">
              <Clock className="h-4 w-4 text-gold" />
              Countdown to registration opening
            </p>

            <div className="flex items-end justify-center gap-3 sm:gap-6 md:gap-8">
              <Unit value={time.days} label="DAYS" />
              <span className="text-3xl sm:text-5xl text-gold/40 font-black pb-6">:</span>
              <Unit value={time.hours} label="HOURS" />
              <span className="text-3xl sm:text-5xl text-gold/40 font-black pb-6">:</span>
              <Unit value={time.minutes} label="MINUTES" />
              <span className="text-3xl sm:text-5xl text-gold/40 font-black pb-6">:</span>
              <Unit value={time.seconds} label="SECONDS" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
