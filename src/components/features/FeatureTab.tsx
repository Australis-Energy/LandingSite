import { TabsContent } from "@/components/ui/tabs";
import { Check } from 'lucide-react';
import DevelopabilityRings from '../DevelopabilityRings';
import { ComplianceVisual, BuildabilityVisual, GridVisual } from './FeatureVisuals';

interface FeatureHighlight {
  title: string;
  description: string;
  highlights: string[];
  image: string;
  id: string;
}

interface FeatureTabProps {
  feature: FeatureHighlight;
  activeTab: string;
}

const visuals: Record<string, React.ReactNode> = {
  compliance: <ComplianceVisual />,
  design: <BuildabilityVisual />,
  grid: <GridVisual />,
};

const FeatureTab = ({ feature, activeTab }: FeatureTabProps) => {
  return (
    <TabsContent
      key={feature.id}
      value={feature.id}
      className={`${activeTab === feature.id ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        <div className="glass-card p-8 rounded-2xl bg-white/60 border-white/60 shadow-lg flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4 text-australis-navy">
            {feature.title}
          </h3>
          <p className="text-australis-navy/60 mb-6 text-lg">
            {feature.description}
          </p>
          <ul className="space-y-4">
            {feature.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-australis-aqua/15 border border-australis-aqua/30">
                  <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                </span>
                <span className="text-australis-navy/80">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {feature.id === 'scoring' ? (
          <div className="glass-card p-8 rounded-2xl bg-white/60 border-white/60 shadow-lg flex items-center justify-center">
            <DevelopabilityRings />
          </div>
        ) : (
          visuals[feature.id] ?? (
            <div className={`${feature.image} glass-card rounded-2xl h-64 md:h-80 p-8`} />
          )
        )}
      </div>
    </TabsContent>
  );
};

export default FeatureTab;
