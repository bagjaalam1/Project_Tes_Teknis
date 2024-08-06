// import axios from 'axios';

// // Membuat instance axios dengan token di header
// const apiClient = axios.create({
//   baseURL: 'http://localhost:3001/api',
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`
//   }
// });

// apiClient.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       // Token expired or unauthorized
//       localStorage.removeItem('token'); // Hapus token dari localStorage
//       window.location.href = '/login'; // Redirect ke halaman login
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient