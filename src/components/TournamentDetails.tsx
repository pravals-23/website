import { useInView } from '@/hooks/useInView';
import { eventConfig } from '@/config/event';
import { Calendar, Users, MapPin, Shield } from 'lucide-react';

const CARDS = [
  { icon: Calendar, label: 'DATE', value: '17th & 18th October' },
  { icon: Users, label: 'TEAMS', value: '20 Teams' },
  { icon: MapPin, label: 'VENUE', value: 'Spark7 Sports Arena, Kattigenahalli' },
  { icon: Shield, label: 'CATEGORY', value: 'Under 21' },
];

export default function TournamentDetails() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section id="tournament" className="relative bg-black py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-5xl px-4 text-center">
        <p className="text-xs font-bold tracking-[0.4em] text-gold mb-4">
          THE TOURNAMENT
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
          A BATTLE FOR <span className="text-gold">GLORY</span>
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed mb-14">
          A two-day Under 21 football tournament bringing together the next
          generation of footballers for competitive football, big moments and
          the chance to become Nexus Vittoria champions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 text-center transition-all duration-700 hover:border-gold/40 hover:bg-gold/5 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <p className="text-xs font-bold tracking-[0.25em] text-gold mb-2">
                  {card.label}
                </p>
                <p className="text-base font-semibold text-white">{card.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
