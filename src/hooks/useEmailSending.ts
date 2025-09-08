/**
 * React Hook for Communications Service
 * Provides easy-to-use email sending functionality with loading states
 */

import { useState } from 'react';
import { 
  sendExpertPanelInterest as sendExpertPanelInterestService,
  sendWaitingListInterest as sendWaitingListInterestService,
  sendDemoRequest as sendDemoRequestService,
  SendEmailResponse
} from '@/services/communicationsService';

export const useEmailSending = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendExpertPanelInterest = async (email: string, recaptchaToken?: string): Promise<SendEmailResponse> => {
    setIsLoading(true);
    try {
      const result = await sendExpertPanelInterestService(email, recaptchaToken);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const sendWaitingListInterest = async (email: string, recaptchaToken?: string): Promise<SendEmailResponse> => {
    setIsLoading(true);
    try {
      const result = await sendWaitingListInterestService(email, recaptchaToken);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const sendDemoRequest = async (email: string, recaptchaToken?: string): Promise<SendEmailResponse> => {
    setIsLoading(true);
    try {
      const result = await sendDemoRequestService(email, recaptchaToken);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendExpertPanelInterest,
    sendWaitingListInterest,
    sendDemoRequest,
    isLoading
  };
};
