
// ...existing code...

const DemoSection = () => {
  return (
    <section id="demo" className="py-24 bg-gradient-to-br from-australis-blue/5 to-australis-teal/5">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See Australis in action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch how our platform transforms site selection and assessment
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5" style={{ aspectRatio: '16/9', backgroundColor: '#EDF0F5' }}>
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
    </section>
  );
};

export default DemoSection;
