
import { useInView } from 'react-intersection-observer';
import Marquee from 'react-fast-marquee';

const SocialProofSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const partners = [
    { name: "Geovation", logo: "/lovable-uploads/geovation-clean.png" },
    { name: "Ordnance Survey", logo: "/lovable-uploads/8624a46a-939e-4720-bb86-9838bd50d189.png" },
    { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" }
  ];

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container-custom max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-16">
          Partners
        </h2>

        <div className="glass-card p-8 rounded-xl backdrop-blur-sm overflow-hidden">
          <Marquee gradient={false} speed={60} pauseOnHover={false} autoFill={true} className="w-full">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center p-4 h-24 min-w-[180px] mx-6">
                {partner.isText ? (
                  <p className="text-lg font-medium text-gray-500">{partner.name}</p>
                ) : (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 w-auto object-contain mix-blend-multiply grayscale opacity-70 hover:opacity-100 transition-all duration-300"
                  />
                )}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
