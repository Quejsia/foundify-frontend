import axios from 'axios'
const API = import.meta.env.VITE_API_URL || 'https://foundify-backend-12.onrender.com'
const instance = axios.create({ baseURL: API })
export default instance
