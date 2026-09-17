import { useState, type FormEvent } from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { eventConfig } from '@/config/event';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, Loader2, Lock, AlertCircle } from 'lucide-react';

interface FormData {
  team_name: string;
  captain_name: string;
  captain_phone: string;
  captain_email: string;
  team_manager_name: string;
  number_of_players: string;
  city_area: string;
  instagram_handle: string;
  eligibility_confirmed: boolean;
}

const EMPTY: FormData = {
  team_name: '',
  captain_name: '',
  captain_phone: '',
  captain_email: '',
  team_manager_name: '',
  number_of_players: '',
  city_area: '',
  instagram_handle: '',
  eligibility_confirmed: false,
};

const REQUIRED: (keyof FormData)[] = [
  'team_name',
  'captain_name',
  'captain_phone',
  'captain_email',
  'team_manager_name',
  'number_of_players',
  'city_area',
];

export default function RegistrationForm() {
  const time = useCountdown(eventConfig.registration.opensAt);
  const isOpen = time.isOver;

  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    for (const field of REQUIRED) {
      if (!String(form[field]).trim()) {
        e[field] = 'This field is required';
      }
    }
    if (form.captain_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.captain_email)) {
      e.captain_email = 'Enter a valid email address';
    }
    if (form.captain_phone && form.captain_phone.replace(/\D/g, '').length < 7) {
      e.captain_phone = 'Enter a valid phone number';
    }
    if (form.number_of_players) {
      const n = Number(form.number_of_players);
      if (isNaN(n) || n < 1 || n > 30) {
        e.number_of_players = 'Enter a number between 1 and 30';
      }
    }
    if (!form.eligibility_confirmed) {
      e.eligibility_confirmed = 'You must confirm eligibility';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!isOpen) return;
    if (!validate()) return;

    setStatus('submitting');
    try {
      const { error } = await supabase.from('team_registrations').insert({
        team_name: form.team_name.trim(),
        captain_name: form.captain_name.trim(),
        captain_phone: form.captain_phone.trim(),
        captain_email: form.captain_email.trim(),
        team_manager_name: form.team_manager_name.trim(),
        number_of_players: Number(form.number_of_players),
        city_area: form.city_area.trim(),
        instagram_handle: form.instagram_handle.trim() || null,
        eligibility_confirmed: form.eligibility_confirmed,
      });

      if (error) throw error;
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      console.error('Registration error:', err);
      setStatus('error');
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-xl bg-white/5 border ${
      errors[field] ? 'border-red-500/60' : 'border-white/15'
    } px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-gold focus:bg-white/10`;

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

        {!isOpen ? (
          /* Locked state */
          <div className="rounded-3xl border border-gold/20 bg-gradient-to-b from-white/5 to-transparent p-10 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/30 bg-black/40">
              <Lock className="h-9 w-9 text-gold animate-pulse-slow" />
            </div>
            <h3 className="font-display text-2xl font-black text-white mb-2">
              REGISTRATION OPENS SUNDAY
            </h3>
            <p className="text-sm text-white/60 max-w-md mx-auto">
              Registration is currently closed. Come back on Sunday to secure
              your team's slot in Nexus Vittoria.
            </p>
          </div>
        ) : status === 'success' ? (
          /* Success state */
          <div className="rounded-3xl border border-gold/40 bg-gradient-to-b from-gold/10 to-transparent p-10 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/20 border-2 border-gold">
              <CheckCircle2 className="h-10 w-10 text-gold" />
            </div>
            <h3 className="font-display text-2xl font-black text-white mb-2">
              REGISTRATION RECEIVED
            </h3>
            <p className="text-sm text-white/70 max-w-md mx-auto mb-6">
              Your team registration has been submitted successfully.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="rounded-full border border-gold/40 px-6 py-2.5 text-sm font-bold tracking-wider text-gold hover:bg-gold/10 transition-colors"
            >
              REGISTER ANOTHER TEAM
            </button>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 sm:p-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold tracking-wider text-gold mb-2">
                  TEAM NAME
                </label>
                <input
                  type="text"
                  value={form.team_name}
                  onChange={(e) => update('team_name', e.target.value)}
                  className={inputClass('team_name')}
                  placeholder="Your team name"
                />
                {errors.team_name && <p className="mt-1 text-xs text-red-400">{errors.team_name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gold mb-2">
                  CAPTAIN NAME
                </label>
                <input
                  type="text"
                  value={form.captain_name}
                  onChange={(e) => update('captain_name', e.target.value)}
                  className={inputClass('captain_name')}
                  placeholder="Captain's full name"
                />
                {errors.captain_name && <p className="mt-1 text-xs text-red-400">{errors.captain_name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gold mb-2">
                  CAPTAIN PHONE NUMBER
                </label>
                <input
                  type="tel"
                  value={form.captain_phone}
                  onChange={(e) => update('captain_phone', e.target.value)}
                  className={inputClass('captain_phone')}
                  placeholder="Phone number"
                />
                {errors.captain_phone && <p className="mt-1 text-xs text-red-400">{errors.captain_phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gold mb-2">
                  CAPTAIN EMAIL
                </label>
                <input
                  type="email"
                  value={form.captain_email}
                  onChange={(e) => update('captain_email', e.target.value)}
                  className={inputClass('captain_email')}
                  placeholder="Email address"
                />
                {errors.captain_email && <p className="mt-1 text-xs text-red-400">{errors.captain_email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gold mb-2">
                  TEAM MANAGER NAME
                </label>
                <input
                  type="text"
                  value={form.team_manager_name}
                  onChange={(e) => update('team_manager_name', e.target.value)}
                  className={inputClass('team_manager_name')}
                  placeholder="Manager's full name"
                />
                {errors.team_manager_name && <p className="mt-1 text-xs text-red-400">{errors.team_manager_name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gold mb-2">
                  NUMBER OF PLAYERS
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={form.number_of_players}
                  onChange={(e) => update('number_of_players', e.target.value)}
                  className={inputClass('number_of_players')}
                  placeholder="Squad size"
                />
                {errors.number_of_players && <p className="mt-1 text-xs text-red-400">{errors.number_of_players}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gold mb-2">
                  CITY / AREA
                </label>
                <input
                  type="text"
                  value={form.city_area}
                  onChange={(e) => update('city_area', e.target.value)}
                  className={inputClass('city_area')}
                  placeholder="Your city or area"
                />
                {errors.city_area && <p className="mt-1 text-xs text-red-400">{errors.city_area}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gold mb-2">
                  INSTAGRAM HANDLE <span className="text-white/40 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.instagram_handle}
                  onChange={(e) => update('instagram_handle', e.target.value)}
                  className={inputClass('instagram_handle')}
                  placeholder="@yourteam"
                />
              </div>
            </div>

            {/* Eligibility checkbox */}
            <label className="mt-6 flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.eligibility_confirmed}
                onChange={(e) => update('eligibility_confirmed', e.target.checked)}
                className="mt-0.5 h-5 w-5 rounded border-white/30 bg-white/5 text-gold focus:ring-gold focus:ring-offset-0"
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                I confirm that my team meets the Under 21 tournament eligibility
                requirements.
              </span>
            </label>
            {errors.eligibility_confirmed && (
              <p className="mt-1 text-xs text-red-400">{errors.eligibility_confirmed}</p>
            )}

            {status === 'error' && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle className="h-5 w-5 shrink-0" />
                Something went wrong submitting your registration. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-8 w-full rounded-full bg-gold px-8 py-4 text-sm font-bold tracking-wider text-black transition-all hover:bg-gold-bright hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  SUBMITTING...
                </span>
              ) : (
                'SUBMIT REGISTRATION'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
