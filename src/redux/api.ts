import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`,
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
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
