// import axios from 'axios';
// import API_ENDPOINTS from '../../constant/linkapi';
// import { store } from '../store';
// import { AuthRefreshToken } from './authenSlice';

// const axiosInstance = axios.create({
//   baseURL: API_ENDPOINTS.BASE_URL,
// });

// // Interceptor để thêm token vào các yêu cầu
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const authUser = store.getState().authUser.user;
//     if (authUser && authUser.token) {
//       config.headers['Authorization'] = `Bearer ${authUser.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// // Interceptor để xử lý lỗi 401 và tự động refresh token
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const authUser = store.getState().authUser.user;
//         if (authUser && authUser.refreshToken) {
//           const response = await store.dispatch(AuthRefreshToken({ refreshToken: authUser.refreshToken }));
//           const newToken = response.payload.token;
//           originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//           return axiosInstance(originalRequest);
//         }
//       } catch (err) {
//         // Nếu refresh token không thành công, user sẽ bị logout
//         store.dispatch(logout());
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
