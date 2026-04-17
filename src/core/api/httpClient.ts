import axios from 'axios';
import { BACKEND_ENDPOINTS } from '../constants/endpoints';

export const createHttpClient = (baseURL: string) => {
  const instance = axios.create({
    baseURL: `${baseURL}/api`,
    headers: { 'Content-Type': 'application/json' },
  });

  // Automatically attach Token from LocalStorage
  instance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  // Handle common errors (like 401 Unauthorized)
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle logout or refresh token logic here
        console.error('Unauthorized, please login again.');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Initialize instances for each service
export const catalogApi = createHttpClient(BACKEND_ENDPOINTS.CATALOG);
export const profileApi = createHttpClient(BACKEND_ENDPOINTS.PROFILE);
export const identityApi = createHttpClient(BACKEND_ENDPOINTS.IDENTITY);
