// src/lib/axios.ts  (or put it in api.ts if you prefer)
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fullstackecommerce-wax9.onrender.com',        // same baseURL as your auth endpoints
  withCredentials: true,                   // if you're using session cookies
  headers: {
    'Content-Type': 'application/json',
  },
});


api.defaults.validateStatus = (status) => {
  return status >= 200 && status < 300; // default, but explicitly allow 201
  // OR broader: return status >= 200 && status < 400; // if you have other codes
};
export default api;

