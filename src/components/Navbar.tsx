import { useEffect, useState } from 'react';
import { Menu, X, Trophy } from 'lucide-react';
import { eventConfig } from '@/config/event';

const COLLAB_IMG = eventConfig.collaborator.logo;

const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'TOURNAMENT', href: '#tournament' },
  { label: 'DETAILS', href: '#details' },
  { label: 'REGISTER', href: '#register' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-gold/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleNav('#home')}
          className="flex items-center gap-2 sm:gap-3 group"
        >
          <Trophy className="h-6 w-6 text-gold transition-transform group-hover:scale-110 shrink-0" />
          <span className="font-display text-base sm:text-lg font-bold tracking-widest text-white">
            {eventConfig.brand.name}
          </span>
          <span className="hidden sm:inline-block h-5 w-px bg-white/20" />
          <img
            src={COLLAB_IMG}
            alt="Vertex Events — collaborator"
            className="hidden sm:block h-8 w-auto rounded object-contain"
          />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm font-medium tracking-wider text-white/80 transition-colors hover:text-gold"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => handleNav('#register')}
          className="hidden md:inline-flex items-center rounded-full bg-gold px-6 py-2.5 text-sm font-bold tracking-wider text-black transition-all hover:bg-gold-bright hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]"
        >
          REGISTER NOW
        </button>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="mx-4 mt-3 rounded-2xl bg-black/95 border border-gold/20 backdrop-blur-md p-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left px-4 py-3 text-sm font-medium tracking-wider text-white/80 rounded-lg transition-colors hover:bg-gold/10 hover:text-gold"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#register')}
            className="mt-2 rounded-full bg-gold px-6 py-3 text-sm font-bold tracking-wider text-black"
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </nav>
  );
}
