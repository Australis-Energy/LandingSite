/**
 * Test Component for Expert Panel Integration
 * Use this to test the communications service without using the main form
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmailSending } from '@/hooks/useEmailSending';
import { useToast } from '@/hooks/use-toast';

const ExpertPanelTest = () => {
  const [email, setEmail] = useState('');
  const { sendExpertPanelInterest, isLoading, error } = useEmailSending(false); // Don't show automatic toasts
  const { toast } = useToast();

  const handleTest = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an email address to test.",
      });
      return;
    }

    try {
      const result = await sendExpertPanelInterest(email);
      
      if (result.success) {
        toast({
          title: "Test Successful!",
          description: "Expert panel interest email sent successfully.",
        });
        setEmail('');
      } else {
        toast({
          variant: "destructive",
          title: "Test Failed",
          description: result.error || "Unknown error occurred",
        });
      }
    } catch (err) {
      console.error('Test failed:', err);
      toast({
        variant: "destructive",
        title: "Test Error",
        description: err instanceof Error ? err.message : "Network error occurred",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Expert Panel Integration Test</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="test-email" className="block text-sm font-medium mb-2">
            Test Email Address
          </label>
          <Input
            id="test-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
            disabled={isLoading}
          />
        </div>

        <Button 
          onClick={handleTest}
          disabled={isLoading || !email}
          className="w-full"
        >
          {isLoading ? 'Sending Test...' : 'Test Expert Panel Interest'}
        </Button>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded text-sm">
        <h3 className="font-semibold mb-2">Test Details:</h3>
        <ul className="space-y-1 text-gray-600">
          <li>• Tests the sendExpertPanelInterest function</li>
          <li>• Sends to Azure Communications Function</li>
          <li>• Uses environment variables for function URL and key</li>
          <li>• Shows detailed error messages if configuration is incorrect</li>
        </ul>
      </div>
    </div>
  );
};

export default ExpertPanelTest;
