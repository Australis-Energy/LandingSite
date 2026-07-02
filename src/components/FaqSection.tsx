import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from 'react-intersection-observer';
import { MessageCircleQuestion, Mail } from 'lucide-react';

const FaqSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const faqs = [
    {
      question: "How is the data sourced?",
      answer: "Australis uses a combination of publicly available geospatial data, proprietary datasets, and real-time grid information from trusted sources including Ordnance Survey, environmental agencies, and grid operators."
    },
    {
      question: "How accurate is the developability score?",
      answer: "Our developability scores are based on comprehensive analysis of multiple factors including planning policy, grid constraints, land characteristics, and environmental considerations. The algorithm is continuously refined based on real development outcomes."
    },
    {
      question: "Can I export data from the platform?",
      answer: "Yes, you can export site reports, developability scores, and constraint maps in various formats including PDF, CSV, and GIS-compatible files for further analysis in your preferred tools."
    },
    {
      question: "How often is the data updated?",
      answer: "Core datasets are updated quarterly, while dynamic data like grid capacity information is refreshed weekly. Planning policy interpretations are updated whenever significant policy changes occur."
    },
    {
      question: "Is Australis available outside the UK?",
      answer: "Currently, Australis is focused on the UK market. However, we have plans to expand to other European markets and North America in the future. Contact us to discuss your specific needs."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-australis-lightGray/60 relative" ref={ref}>
      <div className="container-custom max-w-4xl relative z-10">
        <div className={`text-center mb-14 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="section-eyebrow mb-6">
            <MessageCircleQuestion className="h-3.5 w-3.5" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-australis-navy">Frequently Asked Questions</h2>
          <a
            href="mailto:hello@australis.energy"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-australis-navy/10 text-sm font-medium text-australis-navy/70 shadow-sm hover:border-australis-indigo/30 hover:text-australis-indigo hover:shadow-md transition-all duration-300"
          >
            <Mail className="h-4 w-4" />
            Have other questions? hello@australis.energy
          </a>
        </div>

        <Accordion type="single" collapsible className={`w-full space-y-3 ${inView ? 'animate-fade-in-up stagger-1' : 'opacity-0'}`}>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-australis-navy/5 shadow-sm px-6 data-[state=open]:shadow-lg data-[state=open]:shadow-australis-navy/5 data-[state=open]:border-australis-indigo/15 transition-all duration-300"
            >
              <AccordionTrigger className="text-base md:text-lg font-semibold text-australis-navy hover:no-underline hover:text-australis-indigo transition-colors py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-australis-navy/65 leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
