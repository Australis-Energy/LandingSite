import { useInView } from 'react-intersection-observer';
import { Gauge } from 'lucide-react';
import EngineBenefitCard from './benefits/EngineBenefitCard';

const benefitCards = [{
  icon: "cpu" as const,
  iconAccent: "australis-indigo" as const,
  title: "Find the Best Locations, Instantly",
  subtitle: "Pinpoint truly viable sites in less time.",
  bullets: ["Surface land that meets your exact technical, grid, and policy needs", "See sustainability, planning, and connection obstacles before you commit"]
}, {
  icon: "map" as const,
  iconAccent: "australis-aqua" as const,
  title: "Maximise Feasibility Early",
  subtitle: "Know what you can build—without expensive custom studies.",
  bullets: ["Estimate buildability and power yield based on site realities", "Reveal project risks pre-investment, avoiding costly surprises"]
}, {
  icon: "compliance" as const,
  iconAccent: "australis-indigo" as const,
  title: "Stay Secure with Built-In Compliance",
  subtitle: "Remove regulatory guesswork from your workflow.",
  bullets: ["Check rules and constraints with up-to-date AI analysis", "Export ready-made evidence for consultation or investors"]
}];

const BenefitsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="benefits" className="py-24 bg-gradient-to-br from-australis-offWhite via-white to-australis-lightGray relative overflow-hidden">
      {/* Layered background effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-australis-aqua/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-australis-indigo/15 to-transparent rounded-full blur-3xl"></div>
      </div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-14 max-w-4xl mx-auto">
          <div className="section-eyebrow mb-6">
            <Gauge className="h-3.5 w-3.5" />
            Why Australis
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-australis-navy text-balance leading-tight">
            Reduce the time taken for early-stage site assessments{' '}
            <span className="bg-gradient-to-r from-australis-indigo to-australis-aqua bg-clip-text text-transparent">by 95%</span>
          </h2>
          <p className="text-lg text-australis-navy/60 max-w-2xl mx-auto">
            Australis pinpoints optimal locations, automates entire feasibility and compliance processes, and produces ready-to-use evidence for consults, permits or investments.
          </p>
          <div className="h-1 w-40 mx-auto mt-8 bg-gradient-to-r from-australis-indigo to-australis-aqua rounded-full"></div>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {benefitCards.map((card, idx) => (
            <div key={idx} className={inView ? `animate-fade-in-up stagger-${idx + 1}` : 'opacity-0'}>
              <EngineBenefitCard {...card} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
