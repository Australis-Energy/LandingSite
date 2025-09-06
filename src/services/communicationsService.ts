/**
 * Communications Service for Australis Energy Platform
 * Handles email sending via Azure Communications Function
 */

import { config, getFunctionHeaders } from '@/lib/config';

export interface SendEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  to?: string;
  recaptchaToken?: string;
}

export interface SendEmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class CommunicationsService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = config.functions.communications.url;
  }

  /**
   * Makes an authenticated request to the Communications Azure Function
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (!this.baseUrl) {
      throw new Error('Communications function URL is not configured');
    }

    // For Azure Functions with function-level authorization, add the code as a query parameter
    const functionKey = config.functions.communications.key;
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${this.baseUrl}${endpoint}${functionKey ? `${separator}code=${functionKey}` : ''}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Communications function request failed: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Communications request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Send an email using the Azure Communications Service
   */
  async sendEmail(emailRequest: SendEmailRequest): Promise<SendEmailResponse> {
    try {
      // Validate required fields
      if (!emailRequest.name || !emailRequest.email || !emailRequest.subject || !emailRequest.message) {
        return {
          success: false,
          error: 'Missing required fields: name, email, subject, and message are required'
        };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailRequest.email)) {
        return {
          success: false,
          error: 'Invalid email format'
        };
      }

      const response = await this.request<SendEmailResponse>('/api/send-email', {
        method: 'POST',
        body: JSON.stringify(emailRequest),
      });

      return response;
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Send a contact form email (convenience method)
   */
  async sendContactForm(
    name: string,
    email: string,
    message: string,
    recaptchaToken?: string
  ): Promise<SendEmailResponse> {
    return this.sendEmail({
      name,
      email,
      subject: `Contact Form Submission from ${name}`,
      message: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      recaptchaToken,
    });
  }

  /**
   * Send a support request email
   */
  async sendSupportRequest(
    name: string,
    email: string,
    subject: string,
    description: string,
    priority: 'low' | 'medium' | 'high' = 'medium',
    recaptchaToken?: string
  ): Promise<SendEmailResponse> {
    return this.sendEmail({
      name,
      email,
      subject: `[${priority.toUpperCase()}] Support Request: ${subject}`,
      message: `
Support Request Details:

Name: ${name}
Email: ${email}
Priority: ${priority}
Subject: ${subject}

Description:
${description}
      `.trim(),
      recaptchaToken,
    });
  }

  /**
   * Send a newsletter signup confirmation
   */
  async sendNewsletterSignup(
    name: string,
    email: string,
    recaptchaToken?: string
  ): Promise<SendEmailResponse> {
    return this.sendEmail({
      name,
      email,
      subject: 'Newsletter Subscription - Australis Energy',
      message: `
Hello ${name},

Thank you for subscribing to the Australis Energy newsletter!

You'll receive updates about:
- New features and product updates
- Industry insights and renewable energy news
- Beta access opportunities
- Company announcements

Best regards,
The Australis Energy Team
      `.trim(),
      recaptchaToken,
    });
  }

  /**
   * Send expert panel application (full version)
   */
  async sendExpertPanelApplication(
    name: string,
    email: string,
    expertise: string,
    experience: string,
    recaptchaToken?: string
  ): Promise<SendEmailResponse> {
    return this.sendEmail({
      name,
      email,
      subject: `Expert Panel Application from ${name}`,
      message: `
Expert Panel Application:

Name: ${name}
Email: ${email}

Area of Expertise:
${expertise}

Relevant Experience:
${experience}
      `.trim(),
      recaptchaToken,
    });
  }

  /**
   * Send expert panel interest (simplified version with just email)
   */
  async sendExpertPanelInterest(
    email: string,
    recaptchaToken?: string
  ): Promise<SendEmailResponse> {
    return this.sendEmail({
      name: 'Expert Panel Interested User',
      email,
      subject: 'Expert Panel Interest Expression',
      message: `
Expert Panel Interest:

Email: ${email}

A user has expressed interest in joining the expert panel. 
Please follow up to collect additional details about their expertise and experience.
      `.trim(),
      recaptchaToken,
    });
  }

  /**
   * Health check for Communications service
   */
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      // Since your function doesn't have a health endpoint, we'll just test connectivity
      const response = await fetch(this.baseUrl, { method: 'GET' });
      return {
        status: response.ok ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
      };
    }
  }
}

// Export singleton instance
export const communicationsService = new CommunicationsService();

// Export convenience functions for direct use
export const sendEmail = (emailRequest: SendEmailRequest) => communicationsService.sendEmail(emailRequest);
export const sendContactForm = (name: string, email: string, message: string, recaptchaToken?: string) => 
  communicationsService.sendContactForm(name, email, message, recaptchaToken);
export const sendSupportRequest = (name: string, email: string, subject: string, description: string, priority?: 'low' | 'medium' | 'high', recaptchaToken?: string) => 
  communicationsService.sendSupportRequest(name, email, subject, description, priority, recaptchaToken);
export const sendNewsletterSignup = (name: string, email: string, recaptchaToken?: string) => 
  communicationsService.sendNewsletterSignup(name, email, recaptchaToken);
export const sendExpertPanelApplication = (name: string, email: string, expertise: string, experience: string, recaptchaToken?: string) => 
  communicationsService.sendExpertPanelApplication(name, email, expertise, experience, recaptchaToken);
export const sendExpertPanelInterest = (email: string, recaptchaToken?: string) => 
  communicationsService.sendExpertPanelInterest(email, recaptchaToken);
