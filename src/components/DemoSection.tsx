
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

        <div className="relative max-w-4xl mx-auto w-full bg-gray-100 rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '16/9' }}>
          <video
            src="/lovable-uploads/Australis-demo.mp4"
            className="w-full h-full object-cover border border-gray-200 bg-white"
            controls
          />
        </div>
        
      </div>
    </section>
  );
};

export default DemoSection;
