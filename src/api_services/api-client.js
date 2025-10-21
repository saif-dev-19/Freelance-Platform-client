import axios from "axios";

// https://freelance-platform-delta.vercel.app/api 
const apiClient = axios.create({
    baseURL : "http://127.0.0.1:8000/api",
});

export default apiClient