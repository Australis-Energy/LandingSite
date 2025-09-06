/**
 * Azure Functions Service for GeoServices
 * Handles communication with Python Azure Functions for geospatial calculations
 */

import { config, getFunctionHeaders } from '@/lib/config';

export interface GeoCalculationRequest {
  projectId: string;
  siteGeometry: GeoJSON.Geometry;
  calculationType: 'solar' | 'wind' | 'battery' | 'all';
  parameters?: {
    technologyType?: string;
    capacity?: number;
    [key: string]: any;
  };
}

export interface GeoCalculationResponse {
  success: boolean;
  data?: {
    developabilityScore: number;
    constraints: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high';
      description: string;
      impact: number;
    }>;
    suitabilityAnalysis: {
      solarSuitability?: number;
      windSuitability?: number;
      gridConnection?: number;
      accessRoads?: number;
    };
    calculations: {
      [key: string]: any;
    };
  };
  message?: string;
  executionId?: string;
}

export interface CalculationStatus {
  executionId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress?: number;
  message?: string;
  results?: GeoCalculationResponse['data'];
}

class GeoServicesClient {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = config.functions.geoServices.url;
  }

  /**
   * Makes an authenticated request to Azure Functions
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (!this.baseUrl) {
      throw new Error('GeoServices function URL is not configured');
    }

    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...getFunctionHeaders('geoServices'),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Azure Function request failed: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`GeoServices request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Start a geospatial calculation
   */
  async startCalculation(request: GeoCalculationRequest): Promise<GeoCalculationResponse> {
    return this.request<GeoCalculationResponse>('/api/calculate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Get calculation status (for long-running operations)
   */
  async getCalculationStatus(executionId: string): Promise<CalculationStatus> {
    return this.request<CalculationStatus>(`/api/status/${executionId}`);
  }

  /**
   * Get available calculation types
   */
  async getCalculationTypes(): Promise<Array<{
    type: string;
    name: string;
    description: string;
    parameters: Array<{
      name: string;
      type: string;
      required: boolean;
      description: string;
    }>;
  }>> {
    return this.request('/api/calculation-types');
  }

  /**
   * Validate site geometry
   */
  async validateGeometry(geometry: GeoJSON.Geometry): Promise<{
    valid: boolean;
    issues?: string[];
    suggestions?: string[];
  }> {
    return this.request('/api/validate-geometry', {
      method: 'POST',
      body: JSON.stringify({ geometry }),
    });
  }

  /**
   * Get constraint data for a specific area
   */
  async getConstraints(geometry: GeoJSON.Geometry): Promise<{
    constraints: Array<{
      type: string;
      name: string;
      description: string;
      severity: 'low' | 'medium' | 'high';
      geometry: GeoJSON.Geometry;
    }>;
  }> {
    return this.request('/api/constraints', {
      method: 'POST',
      body: JSON.stringify({ geometry }),
    });
  }

  /**
   * Health check for GeoServices
   */
  async healthCheck(): Promise<{ status: string; version: string; timestamp: string }> {
    return this.request('/api/health');
  }

  /**
   * Poll for calculation completion
   */
  async pollForCompletion(
    executionId: string,
    maxAttempts: number = 30,
    intervalMs: number = 2000
  ): Promise<CalculationStatus> {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const status = await this.getCalculationStatus(executionId);
      
      if (status.status === 'completed' || status.status === 'failed') {
        return status;
      }
      
      attempts++;
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
    
    throw new Error('Calculation timed out');
  }
}

// Export singleton instance
export const geoServicesClient = new GeoServicesClient();
