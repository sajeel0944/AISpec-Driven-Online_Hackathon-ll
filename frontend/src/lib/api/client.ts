// lib/api/client.ts
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiClient {
  private static instance: AxiosInstance;

  static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Request interceptor
      this.instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }
          return config;
        },
        (error: AxiosError) => {
          return Promise.reject(error);
        }
      );

      // Response interceptor
      this.instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
          const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
          
          if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
              const refreshToken = localStorage.getItem('refreshToken');
              if (!refreshToken) {
                throw new Error('No refresh token available');
              }

              const response = await axios.post(`${API_BASE_URL}/refresh`, {
                refreshToken,
              });

              const { token, refreshToken: newRefreshToken } = response.data.data;
              
              localStorage.setItem('token', token);
              if (newRefreshToken) {
                localStorage.setItem('refreshToken', newRefreshToken);
              }

              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              
              return this.instance(originalRequest);
            } catch (refreshError) {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              window.location.href = '/login';
              return Promise.reject(refreshError);
            }
          }
          
          return Promise.reject(error);
        }
      );
    }

    return this.instance;
  }
}

export default ApiClient;