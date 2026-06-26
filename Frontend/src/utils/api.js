import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const sessionStr = localStorage.getItem('hirehub_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.token) {
          config.headers.Authorization = `Bearer ${session.token}`;
        }
      } catch (err) {
        console.error('Error parsing session token:', err);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
