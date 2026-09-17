import { useInView } from '@/hooks/useInView';

const STEPS = [
  { num: '1', label: 'REGISTER YOUR TEAM' },
  { num: '2', label: 'CONFIRM YOUR SLOT' },
  { num: '3', label: 'SHOW UP' },
  { num: '4', label: 'PLAY' },
  { num: '5', label: 'FIGHT FOR THE TITLE' },
];

export default function TournamentFlow() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative bg-gradient-to-b from-black via-neutral-950 to-black py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.4em] text-gold mb-4">
            HOW IT WORKS
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white">
            THE ROAD TO <span className="text-gold">VICTORY</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`relative text-center transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-gold/40 to-transparent" />
              )}
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/30 bg-black transition-all hover:border-gold hover:bg-gold/10 hover:scale-110">
                <span className="font-display text-2xl font-black text-gold">
                  {step.num}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold tracking-wider text-white/80 px-1">
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
