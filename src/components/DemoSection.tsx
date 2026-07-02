import { useInView } from 'react-intersection-observer';
import { PlayCircle } from 'lucide-react';

const DemoSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="demo" className="py-24 bg-gradient-to-br from-australis-offWhite via-white to-australis-lightGray relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>
      <div className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-br from-australis-aqua/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 -right-32 w-96 h-96 bg-gradient-to-tl from-australis-indigo/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className={`text-center mb-14 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="section-eyebrow mb-6">
            <PlayCircle className="h-3.5 w-3.5" />
            Product demo
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-australis-navy">
            See Australis <span className="bg-gradient-to-r from-australis-indigo to-australis-aqua bg-clip-text text-transparent">in action</span>
          </h2>
          <p className="text-lg text-australis-navy/60 max-w-2xl mx-auto">
            Watch how our platform transforms site selection and assessment
          </p>
        </div>

        <div className={`relative max-w-6xl mx-auto ${inView ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
          {/* Ambient glow behind the player */}
          <div className="absolute -inset-6 bg-gradient-to-r from-australis-indigo/20 via-australis-aqua/20 to-australis-indigo/20 rounded-[2rem] blur-2xl opacity-60 pointer-events-none"></div>

          {/* Browser-style frame */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-australis-navy/20 ring-1 ring-australis-navy/10 bg-white">
            <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-b from-white to-australis-lightGray/50 border-b border-australis-navy/5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400/80"></span>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-australis-navy/5 text-xs font-medium text-australis-navy/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  app.australis.energy
                </div>
              </div>
              <span className="w-14"></span>
            </div>

            <div className="relative w-full" style={{ aspectRatio: '16/9', backgroundColor: '#EDF0F5' }}>
              <iframe
                src="/launch-video.html"
                title="Australis launch video"
                className="absolute inset-0 w-full h-full border-0"
                style={{ backgroundColor: '#EDF0F5' }}
                loading="lazy"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
