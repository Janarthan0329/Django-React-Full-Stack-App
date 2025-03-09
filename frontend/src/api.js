import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({ // To create a new axios instance
    baseURL: import.meta.env.VITE_API_URL, // To get the URL from the .env file
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;