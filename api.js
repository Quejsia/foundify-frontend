// api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  async fetchItems() {
    try {
      const response = await apiClient.get('/items');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch items');
    }
  },

  async login({ email, password }) {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async signup({ name, email, password }) {
    try {
      const response = await apiClient.post('/auth/signup', { name, email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  },

  async claimItem(itemId, message) {
    try {
      const token = localStorage.getItem('foundify_token');
      const response = await apiClient.post(
        `/items/${itemId}/claim`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  },
};

export default api;
