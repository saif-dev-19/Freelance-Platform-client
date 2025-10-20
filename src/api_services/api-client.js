import axios from "axios";

// http://127.0.0.1:8000/api
const apiClient = axios.create({
    baseURL : "https://freelance-platform-delta.vercel.app",
});

export default apiClient