/**
 * React Hook for Communications Service
 * Provides easy-to-use email sending functionality with loading states
 */

import { useState } from 'react';
import { 
  sendExpertPanelInterest as sendExpertPanelInterestService,
  sendWaitingListInterest as sendWaitingListInterestService,
  sendDemoRequest as sendDemoRequestService,
  sendExpertPanelInterestOptimistic as sendExpertPanelInterestOptimisticService,
  sendWaitingListInterestOptimistic as sendWaitingListInterestOptimisticService,
  sendDemoRequestOptimistic as sendDemoRequestOptimisticService,
  SendEmailResponse
} from '@/services/communicationsService';

export const useEmailSending = (useOptimistic: boolean = true) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendExpertPanelInterest = async (email: string, recaptchaToken?: string): Promise<SendEmailResponse> => {
    setIsLoading(true);
    try {
      const service = useOptimistic ? sendExpertPanelInterestOptimisticService : sendExpertPanelInterestService;
      const result = await service(email, recaptchaToken);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const sendWaitingListInterest = async (email: string, recaptchaToken?: string): Promise<SendEmailResponse> => {
    setIsLoading(true);
    try {
      const service = useOptimistic ? sendWaitingListInterestOptimisticService : sendWaitingListInterestService;
      const result = await service(email, recaptchaToken);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const sendDemoRequest = async (email: string, recaptchaToken?: string): Promise<SendEmailResponse> => {
    setIsLoading(true);
    try {
      const service = useOptimistic ? sendDemoRequestOptimisticService : sendDemoRequestService;
      const result = await service(email, recaptchaToken);
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
