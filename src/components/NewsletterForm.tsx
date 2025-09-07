import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEmailSending } from '@/hooks/useEmailSending';
const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  const { sendWaitingListInterest, isLoading } = useEmailSending();
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
      const result = await sendWaitingListInterest(email);

      if (result.success) {
        setIsSubscribed(true);
        setEmail('');
        toast({
          title: "🎯 You're on the list!",
          description: "We'll keep you updated as we get closer to launch. Thanks for your patience!",
          duration: 6000,
        });
      }
    } catch (error) {
      console.error('Waiting list signup failed:', error);
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong",
        description: "We couldn't add you to the waitlist right now. Please try again in a moment.",
      });
    }
  };
  return <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-4 text-slate-50">Stay updated</h3>
      <p className="text-white/80 mb-6">
        Get early access and product updates by joining our waitlist.
      </p>
      
      {isSubscribed ? <div className="flex items-center gap-3 text-white">
          <div className="bg-australis-teal rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
          <span>You're on the waitlist!</span>
        </div> : <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input type="email" placeholder="Your work email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-white/20 border-white/30 text-white placeholder:text-white/60" />
          </div>
          <Button type="submit" className="w-full bg-white text-australis-blue hover:bg-white/90" disabled={isLoading}>
            {isLoading ? 'Adding you...' : 'Join Waitlist'}
          </Button>
        </form>}
    </div>;
};
export default NewsletterForm;