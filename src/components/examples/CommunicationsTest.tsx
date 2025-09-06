/**
 * Test Component for Communications Service
 * Use this to test your email function configuration
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmailSending } from '@/hooks/useEmailSending';
import { communicationsService } from '@/services/communicationsService';
import { Loader2, Mail, CheckCircle, XCircle } from 'lucide-react';

const CommunicationsTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const { sendContactForm, isLoading } = useEmailSending();

  const testConnection = async () => {
    setIsTestingConnection(true);
    setTestResult('');

    try {
      // Test the health check endpoint
      const health = await communicationsService.healthCheck();
      setTestResult(`✅ Connection successful! Status: ${health.status}`);
    } catch (error) {
      setTestResult(`❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const testEmail = async () => {
    const result = await sendContactForm(
      'Test User',
      'test@example.com',
      'This is a test message from the Australis landing site configuration test.'
    );

    if (result.success) {
      setTestResult('✅ Test email sent successfully!');
    } else {
      setTestResult(`❌ Email test failed: ${result.error || 'Unknown error'}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Communications Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button 
            onClick={testConnection} 
            variant="outline"
            className="w-full"
            disabled={isTestingConnection}
          >
            {isTestingConnection ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing Connection...
              </>
            ) : (
              'Test Connection'
            )}
          </Button>

          <Button 
            onClick={testEmail} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Test Email...
              </>
            ) : (
              'Send Test Email'
            )}
          </Button>
        </div>

        {testResult && (
          <div className={`p-3 rounded-md text-sm ${
            testResult.includes('✅') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {testResult}
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Function URL:</strong> {process.env.NODE_ENV === 'development' ? 
            import.meta.env.VITE_COMMUNICATIONS_FUNCTION_URL || 'Not configured' : 
            'Configured'
          }</p>
          <p><strong>Function Key:</strong> {
            import.meta.env.VITE_COMMUNICATIONS_FUNCTION_KEY ? 
            `${import.meta.env.VITE_COMMUNICATIONS_FUNCTION_KEY.substring(0, 8)}...` : 
            'Not configured'
          }</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationsTest;
