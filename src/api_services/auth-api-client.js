import axios from "axios";

// https://freelance-platform-delta.vercel.app/api
const authApiClient = axios.create({
    baseURL : "http://127.0.0.1:8000/api",
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