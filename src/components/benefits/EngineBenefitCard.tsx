import { Cpu, Map, FileCheck2, Check } from 'lucide-react';

type EngineBenefitCardProps = {
  icon: "cpu" | "map" | "compliance";
  iconAccent: "australis-indigo" | "australis-aqua";
  title: string;
  subtitle: string;
  bullets: string[];
  className?: string;
};

const icons = {
  cpu: Cpu,
  map: Map,
  compliance: FileCheck2,
};

const accentText = {
  "australis-indigo": "text-australis-indigo",
  "australis-aqua": "text-emerald-500",
};

const EngineBenefitCard = ({
  icon,
  iconAccent,
  title,
  subtitle,
  bullets,
  className = "",
}: EngineBenefitCardProps) => {
  const Icon = icons[icon];
  return (
    <div
      className={
        "group relative flex flex-col p-8 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/60 shadow-xl shadow-australis-navy/5 transition-all duration-500 " +
        "hover:shadow-2xl hover:shadow-australis-aqua/15 hover:-translate-y-2 hover:bg-white/80 focus-within:-translate-y-2 " +
        className
      }
      tabIndex={0}
      aria-label={title}
    >
      {/* Gradient hairline on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-australis-indigo/[0.07] via-transparent to-australis-aqua/[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative inline-flex self-start p-4 bg-gradient-to-br from-white to-white/70 rounded-2xl shadow-lg shadow-australis-navy/5 mb-5 border border-white/70 group-hover:scale-110 group-hover:shadow-australis-aqua/20 transition-all duration-500">
        <Icon className={`h-7 w-7 ${accentText[iconAccent]}`} />
      </div>

      <h3 className="text-xl font-bold mb-2 text-australis-navy">{title}</h3>
      <p className="text-australis-indigo/80 text-base mb-5">{subtitle}</p>

      <ul className="space-y-3 text-left mt-auto">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-australis-aqua/15 border border-australis-aqua/30">
              <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
            </span>
            <span className="text-australis-navy/75 leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EngineBenefitCard;
