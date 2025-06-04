import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
} );

// İstek interceptor'ı ekleyin
api.interceptors.request.use(
  config => {
    // İsteğe header ekleyebilirsiniz (gerekirse)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Yanıt interceptor'ı ekleyin
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 403 hatası için özel işlem yapabilirsiniz
    if (error.response && error.response.status === 403) {
      console.error('Yetkilendirme hatası:', error);
      // İsterseniz kullanıcıyı login sayfasına yönlendirebilirsiniz
    }
    return Promise.reject(error);
  }
);

export default api;
