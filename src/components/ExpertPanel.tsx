import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { BrainCircuit, Sparkles, Users, Clock, Calendar } from "lucide-react";
import { useEmailSending } from "@/hooks/useEmailSending";


import { useRecaptcha } from "@/hooks/useRecaptcha";
import React from "react";

type FormType = 'expert-panel' | 'waiting-list' | 'demo-request';

const ExpertPanel = () => {
  const { toast } = useToast();
  const { executeRecaptcha } = useRecaptcha();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeForm, setActiveForm] = useState<FormType>('expert-panel');
  const { sendExpertPanelInterest, sendWaitingListInterest, sendDemoRequest, isLoading } = useEmailSending(true); // Enable optimistic UI

  const formConfig = {
    'expert-panel': {
      title: 'Join Our Expert Panel',
      description: 'Help shape the future of renewable energy software. Join our expert panel to provide feedback, get early access, and connect with other industry leaders.',
      buttonText: 'Join Panel',
      successTitle: 'Thank you for joining!',
      successMessage: 'You have been added to our expert panel. We will be in touch soon!',
      loadingText: 'Joining...',
      handler: sendExpertPanelInterest,
      icon: <BrainCircuit className="mx-auto text-australis-indigo" />
    },
    'waiting-list': {
      title: 'Join the Waiting List',
      description: 'Be the first to know when Australis Energy Platform launches. Get exclusive updates and early-bird offers.',
      buttonText: 'Join Waitlist',
      successTitle: 'You’re on the list!',
      successMessage: 'We’ve added you to our waiting list. Stay tuned for updates!',
      loadingText: 'Adding...',
      handler: sendWaitingListInterest,
      icon: <Clock className="mx-auto text-australis-indigo" />
    },
    'demo-request': {
      title: 'Book a Demo',
      description: 'See Australis Energy Platform in action. Schedule a personalized demonstration to explore how our platform can revolutionize your renewable energy projects.',
      buttonText: 'Request Demo',
      successTitle: 'Demo Requested!',
      successMessage: 'Our team will reach out soon to schedule your personalized demonstration of the Australis Energy Platform.',
      loadingText: 'Requesting...',
      handler: sendDemoRequest,
      icon: <Calendar className="mx-auto text-australis-indigo" />
    }
  };

  const currentConfig = formConfig[activeForm];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address.",
      });
      return;
    }
    try {
      // Execute reCAPTCHA with action based on form type
      const recaptchaToken = await executeRecaptcha(activeForm);
      const result = await currentConfig.handler(email, recaptchaToken || undefined);
      if (result.success) {
        setEmail("");
        setIsSubmitted(true);
        toast({
          title: currentConfig.successTitle,
          description: currentConfig.successMessage,
          duration: 7000,
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Please check your email address and try again.",
        });
      }
    } catch (error) {
      console.error(`${activeForm} submission failed:`, error);
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong",
        description: "We couldn't submit your request right now. Please try again in a moment.",
      });
    }
  };

  return (
    <section id="expert-panel" className="container-custom relative z-10">
      {/* Form Type Switcher */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex justify-center gap-2 p-2 backdrop-blur-xl bg-white/20 border border-white/40 rounded-2xl">
          {Object.entries(formConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setActiveForm(key as FormType)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeForm === key
                  ? 'bg-australis-indigo text-white shadow-lg'
                  : 'text-australis-navy hover:bg-white/30'
              }`}
            >
              {config.title}
            </button>
          ))}
        </div>
      </div>

      {/* Elevated header section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl p-8 shadow-2xl shadow-australis-navy/5">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-australis-navy drop-shadow-sm">
            {currentConfig.title}
          </h2>
          <div className="h-1 w-40 mx-auto bg-gradient-to-r from-australis-indigo to-australis-aqua rounded-full mb-6 shadow-lg"></div>
          <p className="text-lg text-gray-600 mb-8">
            {currentConfig.description}
          </p>
        </div>
      </div>

      {/* Form and benefit cards wrapper */}
      <div>
        {/* Form section above benefit cards */}
        <div className="max-w-md mx-auto mb-12">
          <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-2xl p-6 shadow-xl shadow-australis-navy/5">
            {isSubmitted ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">{currentConfig.icon}</div>
                <h3 className="text-xl font-semibold text-australis-navy mb-2">{currentConfig.successTitle}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {currentConfig.successMessage}
                </p>
              </div>
            ) : (
              <>
                {activeForm === 'demo-request' ? (
                  <div className="flex flex-col items-center">
                    <a
                      href="https://outlook.office365.com/owa/calendar/TheAustralisTeam@australis.energy/bookings/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-4 rounded-xl bg-australis-indigo text-white font-semibold text-lg shadow-lg hover:bg-australis-indigo/90 transition-colors duration-200 mt-2"
                    >
                      Book a Date Instantly
                    </a>
                    <p className="text-xs text-gray-500 mt-2 text-center">This will open our public team meeting calendar in a new tab.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-australis-aqua/50 backdrop-blur-sm bg-white/40 shadow-inner text-australis-navy placeholder:text-australis-navy/60"
                      required
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-gradient-to-r from-australis-indigo to-australis-indigo/90 hover:from-australis-indigo/90 hover:to-australis-indigo/80 shadow-lg shadow-australis-indigo/20 backdrop-blur-sm border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          {currentConfig.loadingText}
                        </span>
                      ) : (
                        currentConfig.buttonText
                      )}
                    </Button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>

        {/* Benefit cards below the form */}
        <div className="grid md:grid-cols-3 gap-8">
          {(() => {
            const benefits = {
              'expert-panel': [
                {
                  icon: <BrainCircuit className="h-8 w-8 text-australis-indigo drop-shadow-sm" />,
                  title: "Direct Input",
                  description: "Shape product development priorities and feature roadmap"
                },
                {
                  icon: <Sparkles className="h-8 w-8 text-australis-aqua drop-shadow-sm" />,
                  title: "Early Access",
                  description: "Get priority access to new features and capabilities"
                },
                {
                  icon: <Users className="h-8 w-8 text-australis-indigo drop-shadow-sm" />,
                  title: "Network Effect",
                  description: "Connect with other industry leaders and innovators"
                }
              ],
              'waiting-list': [
                {
                  icon: <Clock className="h-8 w-8 text-australis-indigo drop-shadow-sm" />,
                  title: "Priority Access",
                  description: "Be among the first to access the platform when it launches"
                },
                {
                  icon: <Sparkles className="h-8 w-8 text-australis-aqua drop-shadow-sm" />,
                  title: "Exclusive Updates",
                  description: "Get behind-the-scenes development progress and insights"
                },
                {
                  icon: <Users className="h-8 w-8 text-australis-indigo drop-shadow-sm" />,
                  title: "Special Pricing",
                  description: "Receive early-bird pricing and special offers"
                }
              ],
              'demo-request': [
                {
                  icon: <Calendar className="h-8 w-8 text-australis-indigo drop-shadow-sm" />,
                  title: "Personalized Demo",
                  description: "See the platform tailored to your specific use cases"
                },
                {
                  icon: <BrainCircuit className="h-8 w-8 text-australis-aqua drop-shadow-sm" />,
                  title: "Expert Guidance",
                  description: "Get insights from our renewable energy specialists"
                },
                {
                  icon: <Sparkles className="h-8 w-8 text-australis-indigo drop-shadow-sm" />,
                  title: "Custom Solutions",
                  description: "Explore how Australis can solve your specific challenges"
                }
              ]
            };
            return benefits[activeForm].map((benefit, index) => (
              <div 
                key={index}
                className="group relative p-8 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/50 hover:border-australis-aqua/30 hover:bg-white/60 transition-all duration-500 shadow-xl shadow-australis-navy/5 hover:shadow-2xl hover:shadow-australis-aqua/10 transform hover:-translate-y-2"
              >
                {/* Floating icon with enhanced effects */}
                <div className="relative p-6 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-md rounded-2xl shadow-lg shadow-australis-navy/10 mb-6 inline-block border border-white/60 group-hover:shadow-xl group-hover:shadow-australis-aqua/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-australis-aqua/10 to-australis-indigo/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-australis-navy drop-shadow-sm">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                {/* Refined accent elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-australis-aqua/40 to-australis-indigo/40 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-tr from-australis-indigo/40 to-australis-aqua/40 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ));
          })()}
        </div>
      </div>
    </section>
  );
};

export default ExpertPanel;
// Removed duplicate trailing JSX and export after the main component
