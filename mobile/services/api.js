import axios from 'axios';

const baseURL = 'http://172.20.10.6:5000/api'; 

const api = axios.create({
  baseURL,
});


api.interceptors.request.use(async (config) => {
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;



