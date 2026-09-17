import { useInView } from '@/hooks/useInView';
import { eventConfig } from '@/config/event';
import { Instagram } from 'lucide-react';

export default function SocialSection() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative bg-gradient-to-b from-black via-neutral-950 to-black py-20 sm:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-3xl px-4 text-center transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-xs font-bold tracking-[0.4em] text-gold mb-4">
          FOLLOW NEXUS VITTORIA
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
          STAY IN THE <span className="text-gold">GAME</span>
        </h2>
        <p className="mx-auto max-w-xl text-base text-white/70 mb-10">
          Stay updated with fixtures, announcements, tournament news and
          registration updates.
        </p>

        <a
          href={eventConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/5 px-8 py-4 text-sm font-bold tracking-wider text-gold transition-all hover:bg-gold hover:text-black hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:scale-105"
        >
          <Instagram className="h-5 w-5" />
          FOLLOW ON INSTAGRAM
        </a>
      </div>
    </section>
  );
}
