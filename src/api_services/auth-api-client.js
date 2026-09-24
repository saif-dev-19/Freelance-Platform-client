import axios from "axios";

const authApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (
        import.meta.env.DEV
            ? "http://127.0.0.1:8000/api"
            : "https://freelance-platform-delta.vercel.app/api"
    ),
})
export default authApiClient

authApiClient.interceptors.request.use(
    (config) =>{
       const token = localStorage.getItem('authTokens');
       if(token){
            config.headers.Authorization = `JWT ${JSON.parse(token)?.access}`
       }
       return config;
    },(error) => Promise.reject(error)
)