import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, Gauge, MapPin, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const constraintRows = [
  { name: 'Agricultural Land Classification', level: 'CRITICAL', color: 'bg-red-500', badge: 'bg-red-500/10 text-red-600 border-red-500/20' },
  { name: 'Flood Zone 2', level: 'LOW', color: 'bg-australis-aqua', badge: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  { name: 'Grid Connection · 1.2 km', level: 'GOOD', color: 'bg-australis-indigo', badge: 'bg-australis-indigo/10 text-australis-indigo border-australis-indigo/20' },
];

const HeroSection = () => {
  // Respect the user's reduced-motion preference — captured once at mount.
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // When reduced motion is requested, start at the end state (no tweening).
  const [showFirstLine, setShowFirstLine] = useState(prefersReducedMotion);
  const [showSecondLine, setShowSecondLine] = useState(prefersReducedMotion);
  const [score, setScore] = useState(prefersReducedMotion ? 88 : 0);
  const [visibleRows, setVisibleRows] = useState(prefersReducedMotion ? constraintRows.length : 0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer1 = setTimeout(() => {
      setShowFirstLine(true);
      setTimeout(() => setShowSecondLine(true), 800);
    }, 200);
    return () => clearTimeout(timer1);
  }, [prefersReducedMotion]);

  // Animate the developability score counting up
  useEffect(() => {
    if (prefersReducedMotion) return;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setScore((prev) => {
          if (prev >= 88) {
            clearInterval(interval);
            return 88;
          }
          return prev + 2;
        });
      }, 24);
    }, 900);
    return () => clearTimeout(start);
  }, [prefersReducedMotion]);

  // Stagger the constraint rows in
  useEffect(() => {
    if (prefersReducedMotion) return;
    const timers = constraintRows.map((_, i) =>
      setTimeout(() => setVisibleRows(i + 1), 1400 + i * 350)
    );
    return () => timers.forEach(clearTimeout);
  }, [prefersReducedMotion]);

  const handleAccess = () => {
    document.getElementById('expert-panel')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scoreCircumference = 2 * Math.PI * 26;

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-br from-australis-offWhite via-white to-australis-lightGray relative overflow-hidden">
      {/* Blueprint grid + aurora light effects */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-[32rem] h-[32rem] bg-gradient-to-br from-australis-aqua/30 to-australis-aqua/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -left-20 w-[32rem] h-[32rem] rounded-full blur-3xl animate-pulse-slow bg-gradient-to-tr from-australis-indigo/25 to-australis-indigo/5"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-radial from-white/40 to-transparent rounded-full blur-2xl"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="animate-fade-in-up">
         

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-australis-navy leading-[1.08]">
              Find the best renewable energy sites.{' '}
              <span className="bg-gradient-to-r from-australis-indigo to-australis-aqua bg-clip-text text-transparent">
                In minutes, not months.
              </span>
            </h1>

            <div className="space-y-1 mt-6 mb-8">
              <p className={`transition-all duration-700 text-lg md:text-xl text-australis-navy/80 ${showFirstLine ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                Focus on what works.
              </p>
              <p className={`transition-all duration-700 text-lg md:text-xl text-australis-navy/80 ${showSecondLine ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                Skip what doesn't.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group rounded-full px-8 text-base bg-gradient-to-r from-australis-indigo to-australis-indigo/85 hover:shadow-xl hover:shadow-australis-indigo/30 hover:-translate-y-0.5 transition-all duration-300"
                onClick={handleAccess}
              >
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 text-base border-australis-navy/15 text-australis-navy bg-white/60 backdrop-blur-sm hover:bg-white hover:border-australis-indigo/30 hover:text-australis-indigo shadow-sm hover:shadow-lg transition-all duration-300"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See it in action
                <PlayCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Trust stats strip */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                { value: '95%', label: 'faster assessments' },
                { value: 'Minutes', label: 'to a go/no-go' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-australis-indigo">{stat.value}</span>
                  <span className="text-sm text-australis-navy/60">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Mobile product proof — static (no count-up / animation), shown only below sm */}
            <div className="sm:hidden mt-10">
              <div className="relative backdrop-blur-xl bg-white/70 border border-white/70 rounded-3xl shadow-xl shadow-australis-navy/10 overflow-hidden">
                <div className="px-4 py-2.5 bg-australis-navy/[0.03] border-b border-australis-navy/5">
                  <span className="text-[11px] font-medium text-australis-navy/50 tracking-wide">app.australis.energy — Site Assessment</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Static score ring at 88 */}
                    <div className="relative shrink-0 w-16 h-16">
                      <svg width="64" height="64" viewBox="0 0 60 60" className="-rotate-90">
                        <circle cx="30" cy="30" r="26" fill="none" stroke="#3a3d5d" strokeOpacity="0.08" strokeWidth="5" />
                        <circle
                          cx="30" cy="30" r="26" fill="none"
                          stroke="url(#hero-score-gradient-mobile)"
                          strokeWidth="5" strokeLinecap="round"
                          strokeDasharray={`${(88 / 100) * scoreCircumference} ${scoreCircumference}`}
                        />
                        <defs>
                          <linearGradient id="hero-score-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6062ff" />
                            <stop offset="100%" stopColor="#3bf5b7" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-australis-navy">88</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-australis-navy/50 leading-tight">Developability</p>
                      <p className="text-base font-bold text-australis-navy">Strong site</p>
                      <p className="text-xs text-australis-navy/50">45 MVA · 1.2 km grid headroom</p>
                    </div>
                  </div>
                  {/* Static constraint rows */}
                  <div className="space-y-2">
                    {constraintRows.map((row) => (
                      <div
                        key={row.name}
                        className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/80 border border-australis-navy/5 shadow-sm"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${row.color}`}></span>
                          <span className="text-sm font-medium text-australis-navy truncate">{row.name}</span>
                        </div>
                        <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${row.badge}`}>
                          {row.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated product mockup */}
          <div className="relative animate-scale-in hidden sm:block" style={{ animationDelay: '0.3s' }}>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-br from-australis-aqua/25 to-australis-aqua/5 rounded-full blur-2xl"></div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-gradient-to-tr from-australis-indigo/25 to-australis-indigo/5 rounded-full blur-2xl"></div>

            {/* Main assessment card */}
            <div className="relative backdrop-blur-xl bg-white/70 border border-white/70 rounded-3xl shadow-2xl shadow-australis-navy/10 overflow-hidden">
              {/* App chrome */}
              <div className="flex items-center justify-between px-5 py-3 bg-australis-navy/[0.03] border-b border-australis-navy/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70"></span>
                </div>
                <span className="text-[11px] font-medium text-australis-navy/50 tracking-wide">app.australis.energy — Site Assessment</span>
                <span className="w-10"></span>
              </div>

              <div className="p-5">
                {/* Map area with site boundary */}
                <div className="relative rounded-2xl bg-gradient-to-br from-[#f4f1ea] to-[#ece8df] h-44 overflow-hidden border border-australis-navy/5">
                  <div className="absolute inset-0 bg-dot-pattern opacity-60"></div>
                  <svg viewBox="0 0 300 176" className="absolute inset-0 w-full h-full" aria-hidden="true">
                    {/* Constraint polygons */}
                    <polygon points="18,40 85,18 120,58 70,95 20,80" fill="#ef4444" fillOpacity="0.13" stroke="#ef4444" strokeOpacity="0.5" strokeWidth="1.5" />
                    <polygon points="200,110 265,92 288,140 235,168 195,150" fill="#ef4444" fillOpacity="0.13" stroke="#ef4444" strokeOpacity="0.5" strokeWidth="1.5" />
                    {/* Site boundary */}
                    <polygon
                      points="130,45 195,38 225,75 205,125 145,132 115,90"
                      fill="#6062ff" fillOpacity="0.15" stroke="#6062ff" strokeWidth="2.5"
                      strokeLinejoin="round"
                      strokeDasharray="380"
                      strokeDashoffset={prefersReducedMotion ? 0 : 380}
                      style={prefersReducedMotion ? undefined : { animation: 'hero-draw 1.6s ease-out 0.8s forwards' }}
                    />
                    {/* Grid line to substation */}
                    <line x1="225" y1="75" x2="282" y2="38" stroke="#3bf5b7" strokeWidth="2" strokeDasharray="5 4" opacity="0.9" />
                    <circle cx="282" cy="38" r="5" fill="#3bf5b7" stroke="#fff" strokeWidth="2" />
                  </svg>
                  {/* Score ring overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-2.5 backdrop-blur-md bg-white/85 rounded-2xl px-3 py-2 shadow-lg border border-white/60">
                    <svg width="60" height="60" viewBox="0 0 60 60" className="-rotate-90">
                      <circle cx="30" cy="30" r="26" fill="none" stroke="#3a3d5d" strokeOpacity="0.08" strokeWidth="5" />
                      <circle
                        cx="30" cy="30" r="26" fill="none"
                        stroke="url(#hero-score-gradient)"
                        strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={`${(score / 100) * scoreCircumference} ${scoreCircumference}`}
                        className="transition-all duration-100"
                      />
                      <defs>
                        <linearGradient id="hero-score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6062ff" />
                          <stop offset="100%" stopColor="#3bf5b7" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute left-3 w-[60px] text-center">
                      <span className="text-lg font-bold text-australis-navy">{score}</span>
                    </div>
                    <div className="pr-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-australis-navy/50 leading-tight">Developability</p>
                      <p className="text-xs font-semibold text-australis-navy">Strong site</p>
                    </div>
                  </div>
                </div>

                {/* Constraint rows */}
                <div className="mt-4 space-y-2">
                  {constraintRows.map((row, i) => (
                    <div
                      key={row.name}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/80 border border-australis-navy/5 shadow-sm transition-all duration-500 ${
                        visibleRows > i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${row.color}`}></span>
                        <span className="text-sm font-medium text-australis-navy truncate">{row.name}</span>
                      </div>
                      <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${row.badge}`}>
                        {row.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute -top-5 -right-2 lg:-right-6 animate-float backdrop-blur-xl bg-white/85 border border-white/70 rounded-2xl px-4 py-3 shadow-xl shadow-australis-navy/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-australis-aqua/15">
                <Zap className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-australis-navy/50 font-medium">Assessment time</p>
                <p className="text-sm font-bold text-australis-navy">4 min 12 sec</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-2 lg:-left-6 animate-float-slow backdrop-blur-xl bg-white/85 border border-white/70 rounded-2xl px-4 py-3 shadow-xl shadow-australis-navy/10 flex items-center gap-3" style={{ animationDelay: '1.2s' }}>
              <div className="p-2 rounded-xl bg-australis-indigo/10">
                <MapPin className="h-4 w-4 text-australis-indigo" />
              </div>
              <div>
                <p className="text-xs text-australis-navy/50 font-medium">Grid headroom</p>
                <p className="text-sm font-bold text-australis-navy">45 MVA · 1.2 km</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
