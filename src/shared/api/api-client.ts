import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor để đính kèm token sau này nếu cần
apiClient.interceptors.request.use(
  (config) => {
    // Ví dụ: lấy token từ localStorage hoặc state manager
    // const token = localStorage.getItem('access_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi chung
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi 401 Unauthorized, 403 Forbidden, v.v.
    if (error.response?.status === 401) {
      console.error('Unauthorized, redirect to Keycloak login...');
      // Logic redirect tới SSO Keycloak
    }
    return Promise.reject(error);
  }
);
