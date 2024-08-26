import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../constraints';
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your backend API base URL
  // baseURL: 'http://localhost:8000/api/v1', // Replace with your backend API base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    // console.log(token);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
