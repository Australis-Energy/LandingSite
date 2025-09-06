/**
 * API Service for Australis Energy Platform
 * Handles communication with the .NET Web API backend
 */

import { config, getApiHeaders } from '@/lib/config';

export interface ApiResponse<T = any> {
  data?: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface ProjectDto {
  id: string;
  name: string;
  description?: string;
  location?: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportDto {
  id: string;
  projectId: string;
  reportType: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  developabilityScore?: number;
  generatedAt?: string;
  data?: any;
}

class ApiService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = config.api.baseUrl;
  }

  /**
   * Makes an authenticated API request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...getApiHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        data: result,
        success: true,
      };
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Projects API
   */
  async getProjects(organizationId?: string): Promise<ApiResponse<ProjectDto[]>> {
    const query = organizationId ? `?organizationId=${organizationId}` : '';
    return this.request<ProjectDto[]>(`/projects${query}`);
  }

  async getProject(projectId: string): Promise<ApiResponse<ProjectDto>> {
    return this.request<ProjectDto>(`/projects/${projectId}`);
  }

  async createProject(project: Omit<ProjectDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ProjectDto>> {
    return this.request<ProjectDto>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(projectId: string, project: Partial<ProjectDto>): Promise<ApiResponse<ProjectDto>> {
    return this.request<ProjectDto>(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(projectId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/projects/${projectId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Reports API
   */
  async getReports(projectId: string): Promise<ApiResponse<ReportDto[]>> {
    return this.request<ReportDto[]>(`/projects/${projectId}/reports`);
  }

  async getReport(projectId: string, reportId: string): Promise<ApiResponse<ReportDto>> {
    return this.request<ReportDto>(`/projects/${projectId}/reports/${reportId}`);
  }

  async createReport(projectId: string, reportType: string, data?: any): Promise<ApiResponse<ReportDto>> {
    return this.request<ReportDto>(`/projects/${projectId}/reports`, {
      method: 'POST',
      body: JSON.stringify({ reportType, data }),
    });
  }

  /**
   * File Upload API
   */
  async uploadFile(file: File, projectId?: string): Promise<ApiResponse<{ url: string; id: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    if (projectId) {
      formData.append('projectId', projectId);
    }

    try {
      const response = await fetch(`${this.baseUrl}/files/upload`, {
        method: 'POST',
        headers: {
          ...getApiHeaders(),
          // Don't set Content-Type for FormData, let browser set it with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();
      return {
        data: result,
        success: true,
      };
    } catch (error) {
      console.error('File upload failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

// Export singleton instance
export const apiService = new ApiService();
