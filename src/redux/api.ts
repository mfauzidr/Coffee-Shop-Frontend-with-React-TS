import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://coffee-shop-backend-with-typescript.vercel.app',
});


instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ganti ini sesuai dengan cara Anda menyimpan token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
