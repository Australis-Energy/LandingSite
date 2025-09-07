import { Button } from '@/components/ui/button';
import NewsletterForm from './NewsletterForm';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { sendCtaFormSubmission } from '@/services/communicationsService';

const CtaSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    workEmail: '',
    companyRole: '',
    challenge: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const challenges = [
    'Accelerating site identification & screening',
    'De-risking our investment pipeline & portfolio',
    'Automating early-stage due diligence for our clients',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.workEmail || !formData.companyRole || !formData.challenge) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await sendCtaFormSubmission(
        formData.name,
        formData.workEmail,
        formData.companyRole,
        formData.challenge
      );

      if (result.success) {
        toast({
          title: "Thank you!",
          description: "We've received your information and will be in touch soon.",
          duration: 5000,
        });
        
        setFormData({ name: '', workEmail: '', companyRole: '', challenge: '' });
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient and blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-australis-navy/95 to-australis-navy/90 z-0"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-australis-aqua/20 rounded-full blur-3xl animate-pulse-slow z-0"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-australis-indigo/20 rounded-full blur-3xl animate-pulse-slow z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="backdrop-blur-sm p-8 rounded-xl border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to accelerate your renewable energy pipeline?
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 text-white">
              Join the developers using Australis to make smarter site decisions, faster.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-australis-aqua/50 focus:border-transparent backdrop-blur-sm"
                  placeholder="Name"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-australis-aqua/50 focus:border-transparent backdrop-blur-sm"
                  placeholder="Work Email"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="companyRole"
                  value={formData.companyRole}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-australis-aqua/50 focus:border-transparent backdrop-blur-sm"
                  placeholder="Company and Role"
                  required
                />
              </div>

              <div>
                <p className="text-white text-sm mb-3">What is the primary challenge you are looking to solve?</p>
                <div className="space-y-2">
                  {challenges.map((challenge) => (
                    <label key={challenge} className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="challenge"
                        value={challenge}
                        checked={formData.challenge === challenge}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-australis-aqua bg-white/10 border-white/30 focus:ring-australis-aqua/50 focus:ring-2"
                        required
                      />
                      <span className="text-white/90 text-sm group-hover:text-white transition-colors">
                        {challenge}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-australis-aqua text-australis-navy hover:bg-australis-aqua/90 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-white/70 text-sm">
                Join the waitlist of top UK developers assessing 500+ sites for 2025 deployments.
              </p>
            </div>
          </div>
          
          <div className="backdrop-blur-sm p-8 rounded-xl border border-white/10">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
