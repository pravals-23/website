import { useInView } from '@/hooks/useInView';
import { eventConfig } from '@/config/event';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export default function VenueSection() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section id="details" className="relative bg-gradient-to-b from-black via-neutral-950 to-black py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.4em] text-gold mb-4">
            THE BATTLEFIELD
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white">
            {eventConfig.event.venueName}
          </h2>
          <p className="mt-2 text-lg font-bold tracking-[0.3em] text-gold">
            {eventConfig.event.venueLocation}
          </p>
        </div>

        <div
          className={`relative overflow-hidden rounded-3xl border border-gold/20 transition-all duration-1000 ${
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img
            src={eventConfig.images.venueField}
            alt="Spark7 Sports Arena football turf under floodlights"
            className="w-full h-[300px] sm:h-[400px] md:h-[520px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Venue info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="max-w-md">
              <div className="flex items-center gap-2 text-gold mb-2">
                <MapPin className="h-5 w-5 shrink-0" />
                <span className="text-sm font-bold tracking-widest">
                  {eventConfig.event.venueName}, {eventConfig.event.venueLocation}
                </span>
              </div>
              <div className="text-white/60 text-sm leading-relaxed space-y-0.5">
                {eventConfig.event.venueAddress.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={eventConfig.venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold tracking-wider text-black transition-all hover:bg-gold-bright hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] hover:scale-105"
              >
                <Navigation className="h-4 w-4" />
                GET DIRECTIONS
              </a>
              <a
                href={eventConfig.venue.viewVenueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-black/40 px-6 py-3 text-sm font-bold tracking-wider text-gold transition-all hover:bg-gold/10 hover:border-gold"
              >
                <ExternalLink className="h-4 w-4" />
                VIEW VENUE
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
