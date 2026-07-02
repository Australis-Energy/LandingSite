
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import FeatureSectionTitle from './features/FeatureSectionTitle';
import FeatureTabs from './features/FeatureTabs';

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute top-40 -right-32 w-96 h-96 bg-gradient-to-br from-australis-indigo/[0.07] to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 -left-32 w-96 h-96 bg-gradient-to-tr from-australis-aqua/[0.08] to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="container-custom relative z-10">
        <FeatureSectionTitle isVisible={isVisible} />
        <FeatureTabs />
      </div>
    </section>
  );
};

export default FeaturesSection;
