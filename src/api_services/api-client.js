import axios from "axios";


const apiClient = axios.create({
    baseURL : "https://freelance-platform-delta.vercel.app/api",
});

export default apiClient