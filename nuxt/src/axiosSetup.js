import axios from 'axios';
import {useRouter} from 'vue-router'

const router = useRouter()

const api = axios.create({
  baseURL: 'http://localhost:3001', // Ganti dengan URL backend Anda
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      router.push('/login'); // Mengarahkan ke halaman login
    }
    return Promise.reject(error);
  }
);

export default api;
