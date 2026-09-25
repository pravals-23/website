import { useCountdown } from '@/hooks/useCountdown';
import { eventConfig } from '@/config/event';
import { Lock, ExternalLink, Trophy } from 'lucide-react';

export default function RegistrationForm() {
  const time = useCountdown(eventConfig.registration.opensAt);
  const isOpen = time.isOver;

  const openForm = () => {
    window.open(eventConfig.registration.formUrl, '_blank', 'noopener');
  };

  return (
    <section id="register" className="relative bg-black py-20 sm:py-28 overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.4em] text-gold mb-4">
            REGISTRATION
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            READY TO <span className="text-gold">COMPETE?</span>
          </h2>
          <p className="text-base text-white/70">
            Think you have what it takes? Step onto the field and prove it.
          </p>
        </div>

        {isOpen ? (
          <div className="rounded-3xl border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent p-8 sm:p-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/40 bg-black/40">
              <Trophy className="h-10 w-10 text-gold" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-3">
              REGISTRATION IS <span className="text-gold">OPEN</span>
            </h3>
            <p className="text-sm text-white/70 max-w-md mx-auto mb-8">
              Secure your team's slot in Nexus Vittoria. Fill out the registration
              form to enter your team.
            </p>
            <button
              onClick={openForm}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-bold tracking-wider text-black transition-all hover:bg-gold-bright hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:scale-105"
            >
              <ExternalLink className="h-5 w-5" />
              REGISTER YOUR TEAM
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border border-gold/20 bg-gradient-to-b from-white/5 to-transparent p-8 sm:p-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/30 bg-black/40">
              <Lock className="h-9 w-9 text-gold animate-pulse-slow" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-3">
              REGISTRATION OPENS SUNDAY
            </h3>
            <p className="text-sm text-white/60 max-w-md mx-auto">
              Registration is currently closed. Come back on Sunday to secure
              your team's slot in Nexus Vittoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
