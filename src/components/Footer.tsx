import { eventConfig } from '@/config/event';
import { Trophy, Instagram } from 'lucide-react';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Tournament', href: '#tournament' },
  { label: 'Details', href: '#details' },
  { label: 'Register', href: '#register' },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-gold/20 pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <Trophy className="h-6 w-6 text-gold" />
              <span className="font-display text-xl font-black tracking-widest text-white">
                {eventConfig.brand.name}
              </span>
            </div>
            <p className="text-sm font-bold tracking-widest text-gold mb-1">
              {eventConfig.brand.subtitle}
            </p>
            <p className="text-sm tracking-[0.2em] text-white/60">
              {eventConfig.brand.tagline}
            </p>
          </div>

          {/* Event info */}
          <div className="text-center">
            <p className="text-sm font-bold tracking-widest text-white mb-2">
              {eventConfig.event.dateLabel}
            </p>
            <p className="text-sm text-white/60">{eventConfig.event.venue}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-end gap-2">
            {LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-white/70 hover:text-gold transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href={eventConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 text-sm text-white/70 hover:text-gold transition-colors"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <p className="mt-8 text-center text-xs text-white/40 tracking-wider">
          © 2026 Nexus Vittoria. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
