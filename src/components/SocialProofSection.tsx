
import { useInView } from 'react-intersection-observer';
import Marquee from 'react-fast-marquee';

const SocialProofSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const partners = [
    { name: "Geovation", logo: "/lovable-uploads/7bf2a95a-42ca-4004-aee8-ecd6db3aa1da.png" },
    { name: "Ordnance Survey", logo: "/lovable-uploads/8624a46a-939e-4720-bb86-9838bd50d189.png" },
    { name: "Microsoft for Startups", logo: "/lovable-uploads/5480d427-a1da-4dfb-8136-ce692da9901e.png" },
    { name: "More Coming Soon!", logo: "", isText: true }
  ];



  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container-custom max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-16">
          Partners
        </h2>

        <div className="glass-card p-8 rounded-xl backdrop-blur-sm overflow-hidden">
          <Marquee gradient={false} speed={60} pauseOnHover={false} className="w-full">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center p-4 h-24 min-w-[180px] mx-6">
                {partner.isText ? (
                  <p className="text-lg font-medium text-gray-500">{partner.name}</p>
                ) : (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 max-w-full object-contain filter-none"
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
