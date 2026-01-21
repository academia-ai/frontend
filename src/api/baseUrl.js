import axios from 'axios'

export const baseUrl = axios.create({
  baseURL:
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_API_URL
      : 'http://localhost:5000/api/v1',
  withCredentials: true,
})
