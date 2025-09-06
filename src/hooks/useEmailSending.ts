/**
 * React Hook for Communications Service
 * Provides easy-to-use email sending functionality with loading states
 */

import { useState } from 'react';
import { communicationsService, SendEmailRequest, SendEmailResponse } from '@/services/communicationsService';
import { toast } from '@/hooks/use-toast';

export interface UseEmailSendingResult {
  sendEmail: (request: SendEmailRequest) => Promise<SendEmailResponse>;
  sendContactForm: (name: string, email: string, message: string, recaptchaToken?: string) => Promise<SendEmailResponse>;
  sendSupportRequest: (name: string, email: string, subject: string, description: string, priority?: 'low' | 'medium' | 'high', recaptchaToken?: string) => Promise<SendEmailResponse>;
  sendNewsletterSignup: (name: string, email: string, recaptchaToken?: string) => Promise<SendEmailResponse>;
  sendExpertPanelApplication: (name: string, email: string, expertise: string, experience: string, recaptchaToken?: string) => Promise<SendEmailResponse>;
  sendExpertPanelInterest: (email: string, recaptchaToken?: string) => Promise<SendEmailResponse>;
  isLoading: boolean;
  error: string | null;
}

export const useEmailSending = (showToasts: boolean = true): UseEmailSendingResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailOperation = async <T extends any[]>(
    operation: (...args: T) => Promise<SendEmailResponse>,
    successMessage: string,
    ...args: T
  ): Promise<SendEmailResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await operation(...args);

      if (result.success) {
        if (showToasts) {
          toast({
            title: "Success!",
            description: result.message || successMessage,
          });
        }
      } else {
        const errorMsg = result.error || 'An error occurred while sending email';
        setError(errorMsg);
        if (showToasts) {
          toast({
            title: "Error",
            description: errorMsg,
            variant: "destructive",
          });
        }
      }

      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMsg);
      if (showToasts) {
        toast({
          title: "Error",
          description: errorMsg,
          variant: "destructive",
        });
      }
      return {
        success: false,
        error: errorMsg,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendEmail: (request: SendEmailRequest) => 
      handleEmailOperation(
        communicationsService.sendEmail.bind(communicationsService),
        'Email sent successfully!',
        request
      ),

    sendContactForm: (name: string, email: string, message: string, recaptchaToken?: string) =>
      handleEmailOperation(
        communicationsService.sendContactForm.bind(communicationsService),
        'Thank you for your message! We\'ll get back to you soon.',
        name,
        email,
        message,
        recaptchaToken
      ),

    sendSupportRequest: (name: string, email: string, subject: string, description: string, priority: 'low' | 'medium' | 'high' = 'medium', recaptchaToken?: string) =>
      handleEmailOperation(
        communicationsService.sendSupportRequest.bind(communicationsService),
        'Support request submitted successfully!',
        name,
        email,
        subject,
        description,
        priority,
        recaptchaToken
      ),

    sendNewsletterSignup: (name: string, email: string, recaptchaToken?: string) =>
      handleEmailOperation(
        communicationsService.sendNewsletterSignup.bind(communicationsService),
        'Successfully subscribed to newsletter!',
        name,
        email,
        recaptchaToken
      ),

    sendExpertPanelApplication: (name: string, email: string, expertise: string, experience: string, recaptchaToken?: string) =>
      handleEmailOperation(
        communicationsService.sendExpertPanelApplication.bind(communicationsService),
        'Expert panel application submitted successfully!',
        name,
        email,
        expertise,
        experience,
        recaptchaToken
      ),

    sendExpertPanelInterest: (email: string, recaptchaToken?: string) =>
      handleEmailOperation(
        communicationsService.sendExpertPanelInterest.bind(communicationsService),
        'Thank you for your interest! We\'ll be in touch about joining our expert panel.',
        email,
        recaptchaToken
      ),

    isLoading,
    error,
  };
};
