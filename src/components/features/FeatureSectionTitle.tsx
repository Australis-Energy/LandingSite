import { Layers } from 'lucide-react';

interface FeatureSectionTitleProps {
  isVisible: boolean;
}

const FeatureSectionTitle = ({ isVisible }: FeatureSectionTitleProps) => {
  return (
    <div className={`text-center mb-14 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className="section-eyebrow mb-6">
        <Layers className="h-3.5 w-3.5" />
        Platform
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-australis-navy text-balance">
        Powerful features for{' '}
        <span className="bg-gradient-to-r from-australis-indigo to-australis-aqua bg-clip-text text-transparent">smarter site selection</span>
      </h2>
      <p className="text-lg text-australis-navy/60 max-w-2xl mx-auto">
        Australis combines cutting-edge AI with comprehensive geospatial data
      </p>
    </div>
  );
};

export default FeatureSectionTitle;
