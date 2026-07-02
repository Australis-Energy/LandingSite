import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { AlertTriangle } from 'lucide-react';

const stats = [
  {
    value: 70,
    suffix: '%',
    label: 'of sites rejected late',
    description: 'Often only after weeks of investigation—due to hidden grid, land, or permission issues.'
  },
  {
    value: 1,
    suffix: ' week',
    label: 'per manual assessment',
    description: 'Slow decisions drive up costs per site, making scaling a pipeline impossible.'
  },
  {
    value: 2,
    suffix: ' out of 3',
    label: 'planning applications fail',
    description: 'UK renewable applications have failed in recent years, as complex risks are missed early.'
  }
];

const CountUp = ({ target, suffix, active }: { target: number; suffix: string; active: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (target <= 3) {
      // Small numbers don't need a count-up
      setValue(target);
      return;
    }
    let current = 0;
    const step = Math.max(1, Math.round(target / 40));
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setValue(current);
      if (current >= target) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [active, target]);

  return (
    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-australis-indigo to-australis-aqua bg-clip-text text-transparent">
      {value}{suffix}
    </span>
  );
};

const ProblemSection = () => {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <section className="py-20 bg-australis-lightGray relative overflow-hidden" id="problem">
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center justify-center gap-4 mb-14 text-center">
          <div className="section-eyebrow">
            <AlertTriangle className="h-3.5 w-3.5" />
            The problem
          </div>
          <h2 className="max-w-3xl text-2xl md:text-4xl font-bold text-australis-navy text-balance">
            Australis moves you from slow, manual reviews to instant, confident go/no-go at scale.
          </h2>
          <p className="max-w-2xl text-lg text-australis-navy/60">
            The bottleneck isn't data—it's making confident decisions, fast.
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/60 hover:shadow-xl hover:shadow-australis-navy/5 hover:-translate-y-1 transition-all duration-500 overflow-hidden ${
                inView ? `animate-fade-in-up stagger-${index + 1}` : 'opacity-0'
              }`}
            >
              {/* Gradient accent along the top edge */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-australis-indigo to-australis-aqua opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-australis-navy/50">
                {stat.label}
              </p>
              <p className="mt-4 text-australis-navy/70 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
