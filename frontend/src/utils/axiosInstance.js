import axios from 'axios';
import { BASE_URL } from '../constraints';
axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your backend API base URL
  headers: {
    "Content-Type": "application/json",
    // Content-Type: multipart/form-data
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(`${BASE_URL}/users/refresh`, null, { withCredentials: true });
        // console.log(data);
 
        const newAccessToken = data?.accessToken;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.log("Token refresh failed, logging out");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  })

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('accessToken');
//     // console.log(token);

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
