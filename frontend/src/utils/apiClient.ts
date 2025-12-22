import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { getDefaultStore } from 'jotai';
import { userTokensAtom } from '@/atoms/userAtoms';

// Get the default Jotai store to access atoms
const store = getDefaultStore();

// Base URL for API requests - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const userTokens = store.get(userTokensAtom);
    if (userTokens?.access && config.headers) {
      config.headers['Authorization'] = `Bearer ${userTokens.access}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    const originalRequest = error.config;

    // If token expired and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const userTokens = store.get(userTokensAtom);
      
      // Try to refresh token if refresh token exists
      if (userTokens?.refresh) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: userTokens.refresh,
          });

          const { access } = response.data;
          
          // Update tokens in store
          store.set(userTokensAtom, {
            ...userTokens,
            access,
          });

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear tokens
          store.set(userTokensAtom, null);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export interface ApiClientOptions extends Omit<AxiosRequestConfig, 'url' | 'data'> {
  // Additional custom options can be added here
}

export interface ApiResponse<T = any> extends AxiosResponse<T> {}

class ApiClient {
  /**
   * GET request
   */
  async get<T = any>(
    url: string,
    options?: ApiClientOptions
  ): Promise<ApiResponse<T>> {
    return axiosInstance.get<T>(url, options);
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    body?: any,
    options?: ApiClientOptions
  ): Promise<ApiResponse<T>> {
    return axiosInstance.post<T>(url, body, options);
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string,
    body?: any,
    options?: ApiClientOptions
  ): Promise<ApiResponse<T>> {
    return axiosInstance.put<T>(url, body, options);
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string,
    body?: any,
    options?: ApiClientOptions
  ): Promise<ApiResponse<T>> {
    return axiosInstance.patch<T>(url, body, options);
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    url: string,
    options?: ApiClientOptions
  ): Promise<ApiResponse<T>> {
    return axiosInstance.delete<T>(url, options);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export default for convenience
export default apiClient;

