import axiosInstance from './axiosConfig';

export const authAPI = {
  login: (credentials) => {
    return axiosInstance.post('/auth/login', credentials);
  },
  
  forgotPassword: (email) => {
    return axiosInstance.post('/auth/forgot-password', { email });
  },
  
  resetPassword: (token, password) => {
    return axiosInstance.post('/auth/reset-password', { token, password });
  },
  
  logout: () => {
    return axiosInstance.post('/auth/logout');
  },
  
  changePassword: (oldPassword, newPassword) => {
    return axiosInstance.post('/auth/change-password', { oldPassword, newPassword });
  },
  
  verifyEmail: (token) => {
    return axiosInstance.post('/auth/verify-email', { token });
  }
};