import axios from 'axios'

export const baseUrl = axios.create({
  baseURL: import.meta.process.env._API_URL ?? 'http://localhost:5000/api/v1', 
  withCredentials: true
})
