import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FileCheck, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Compliance — animated policy checklist                              */
/* ------------------------------------------------------------------ */

const complianceChecks = [
  { rule: 'National Planning Policy Framework', status: 'pass', note: 'Compliant' },
  { rule: 'Green Belt designation', status: 'pass', note: 'Outside boundary' },
  { rule: 'Agricultural Land Classification', status: 'flag', note: 'Grade 2 — review' },
  { rule: 'Heritage & listed buildings', status: 'pass', note: 'No conflicts' },
  { rule: 'Local plan policy EN-3', status: 'pass', note: 'Supported use' },
];

export const ComplianceVisual = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = complianceChecks.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 250 + i * 280)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref} className="glass-card rounded-2xl p-6 md:p-8 h-full flex flex-col justify-center bg-gradient-to-br from-australis-aqua/5 to-australis-indigo/5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-australis-indigo/10">
            <FileCheck className="h-4 w-4 text-australis-indigo" />
          </div>
          <span className="text-sm font-semibold text-australis-navy">Policy compliance scan</span>
        </div>
        <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
          4 / 5 CLEAR
        </span>
      </div>
      <div className="space-y-2.5">
        {complianceChecks.map((check, i) => (
          <div
            key={check.rule}
            className={`flex items-center justify-between px-4 py-3 rounded-xl bg-white/70 border border-white/60 shadow-sm transition-all duration-500 ${
              visible > i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {check.status === 'pass' ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
              )}
              <span className="text-sm font-medium text-australis-navy truncate">{check.rule}</span>
            </div>
            <span className={`text-xs shrink-0 ml-3 ${check.status === 'pass' ? 'text-australis-navy/50' : 'text-amber-600 font-semibold'}`}>
              {check.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Buildability — site boundary with computed buildable area           */
/* ------------------------------------------------------------------ */

export const BuildabilityVisual = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="glass-card rounded-2xl p-6 md:p-8 h-full flex flex-col bg-gradient-to-br from-australis-navy/5 to-australis-indigo/5">
      <div className="relative rounded-xl bg-gradient-to-br from-[#f4f1ea] to-[#ebe7de] flex-1 min-h-[220px] overflow-hidden border border-australis-navy/5">
        <div className="absolute inset-0 bg-dot-pattern opacity-60"></div>
        <svg viewBox="0 0 320 220" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {/* Full site boundary */}
          <polygon
            points="50,40 250,28 290,110 240,190 80,196 30,120"
            fill="#3a3d5d" fillOpacity="0.06" stroke="#3a3d5d" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 4"
          />
          {/* Excluded: woodland */}
          <ellipse cx="80" cy="80" rx="38" ry="30" fill="#16a34a" fillOpacity="0.15" stroke="#16a34a" strokeOpacity="0.4" strokeWidth="1.5" />
          {/* Excluded: watercourse */}
          <path d="M 30 150 Q 110 130 170 165 Q 230 198 300 175" fill="none" stroke="#38BDF8" strokeWidth="7" strokeOpacity="0.4" strokeLinecap="round" />
          {/* Buildable area */}
          <polygon
            points="130,50 245,42 280,108 235,150 150,140 118,95"
            fill="#3bf5b7" fillOpacity={inView ? 0.28 : 0} stroke="#0d9488" strokeWidth="2.5" strokeLinejoin="round"
            style={{ transition: 'fill-opacity 1.2s ease 0.4s' }}
          />
          {/* Panel rows inside buildable area */}
          {[62, 76, 90, 104, 118].map((y, i) => (
            <line
              key={y}
              x1={145 - i * 2} y1={y} x2={250 + i * 2} y2={y - 6}
              stroke="#3a3d5d" strokeWidth="4" strokeOpacity={inView ? 0.5 : 0} strokeLinecap="round"
              style={{ transition: `stroke-opacity 0.6s ease ${0.9 + i * 0.15}s` }}
            />
          ))}
        </svg>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm text-australis-navy border border-white/60 shadow-sm">◼ Woodland excluded</span>
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm text-australis-navy border border-white/60 shadow-sm">〜 Watercourse buffer</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { label: 'Site area', value: '101.4 ha' },
          { label: 'Buildable', value: '68.2 ha' },
          { label: 'Est. capacity', value: '42 MWp' },
        ].map((stat) => (
          <div key={stat.label} className="text-center px-2 py-3 rounded-xl bg-white/70 border border-white/60 shadow-sm">
            <p className="text-base md:text-lg font-bold text-australis-navy">{stat.value}</p>
            <p className="text-[11px] text-australis-navy/50 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Grid — nearest connection points with live-style routing            */
/* ------------------------------------------------------------------ */

export const GridVisual = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const substations = [
    { x: 258, y: 52, label: '132 kV · 1.2 km', headroom: '45 MVA', best: true },
    { x: 60, y: 172, label: '33 kV · 3.8 km', headroom: '8 MVA', best: false },
  ];

  return (
    <div ref={ref} className="glass-card rounded-2xl p-6 md:p-8 h-full flex flex-col bg-gradient-to-br from-australis-indigo/5 to-australis-navy/5">
      <div className="relative rounded-xl bg-gradient-to-br from-[#f2f4f8] to-[#e9ecf3] flex-1 min-h-[220px] overflow-hidden border border-australis-navy/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-70"></div>
        <svg viewBox="0 0 320 220" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {/* Transmission lines */}
          <path d="M 258 52 L 320 30" stroke="#3a3d5d" strokeOpacity="0.25" strokeWidth="2" />
          <path d="M 258 52 L 240 0" stroke="#3a3d5d" strokeOpacity="0.25" strokeWidth="2" />
          <path d="M 60 172 L 0 200" stroke="#3a3d5d" strokeOpacity="0.25" strokeWidth="2" />
          {/* Site */}
          <polygon points="130,95 185,88 205,122 185,155 138,158 118,125" fill="#6062ff" fillOpacity="0.18" stroke="#6062ff" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Route to best substation — animated dash */}
          <path
            d="M 195 100 Q 225 80 254 58"
            fill="none" stroke="#3bf5b7" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 6"
            opacity={inView ? 1 : 0}
            style={{ transition: 'opacity 0.8s ease 0.3s', animation: inView ? 'grid-dash 1.2s linear infinite' : 'none' }}
          />
          {/* Route to alternative — muted */}
          <path d="M 128 140 Q 95 158 68 168" fill="none" stroke="#3a3d5d" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 5" />
          {/* Substation nodes */}
          {substations.map((s) => (
            <g key={s.label}>
              {s.best && (
                <circle cx={s.x} cy={s.y} r="13" fill="#3bf5b7" fillOpacity="0.25">
                  <animate attributeName="r" values="10;16;10" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="fill-opacity" values="0.35;0.08;0.35" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={s.x} cy={s.y} r="6" fill={s.best ? '#0d9488' : '#64748B'} stroke="#fff" strokeWidth="2.5" />
            </g>
          ))}
        </svg>
        {/* Best connection callout */}
        <div className={`absolute top-3 right-3 backdrop-blur-md bg-white/90 rounded-xl px-3.5 py-2.5 shadow-lg border border-white/60 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-bold text-australis-navy">Best connection</span>
          </div>
          <p className="text-[11px] text-australis-navy/60 mt-0.5">132 kV substation · 1.2 km</p>
          <p className="text-[11px] font-semibold text-emerald-600">45 MVA headroom</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        {substations.map((s) => (
          <div key={s.label} className={`flex items-center justify-between px-4 py-3 rounded-xl border shadow-sm ${s.best ? 'bg-australis-aqua/10 border-australis-aqua/30' : 'bg-white/70 border-white/60'}`}>
            <span className="text-xs font-semibold text-australis-navy">{s.label}</span>
            <span className={`text-xs font-bold ${s.best ? 'text-emerald-600' : 'text-australis-navy/40'}`}>{s.headroom}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes grid-dash {
          to { stroke-dashoffset: -26; }
        }
      `}</style>
    </div>
  );
};
