import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (
        import.meta.env.DEV
            ? "http://127.0.0.1:8000/api"
            : "https://freelance-platform-delta.vercel.app/api"
    ),
});

export default apiClient