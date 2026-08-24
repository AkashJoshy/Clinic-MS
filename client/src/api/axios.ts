import { default as axios } from "axios"

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    timeout: 25000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})


export default api