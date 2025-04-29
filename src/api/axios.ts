import axios from 'axios';

// Create an instance for cricket data API
export const cricketApi = axios.create({
  baseURL: import.meta.env.VITE_CRICKET_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_CRICKET_API_KEY}`
  }
});

// Create an instance for AI services
export const aiApi = axios.create({
  baseURL: import.meta.env.VITE_AI_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_AI_API_KEY}`
  }
});

// Add response interceptor for error handling
const handleError = (error: any) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
  }
  return Promise.reject(error);
};

cricketApi.interceptors.response.use(response => response, handleError);
aiApi.interceptors.response.use(response => response, handleError);