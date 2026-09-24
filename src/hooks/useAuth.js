import { useEffect, useRef, useState } from "react";
import apiClient from "../api_services/api-client";



const useAuth = () =>{
    const [user,setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const getToken =() => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;
    }

    const [authTokens,setAuthTokens] = useState(getToken());
    const [authLoading, setAuthLoading] = useState(Boolean(getToken()));
    const profileRequestId = useRef(0);

    useEffect(() => {
        if (authTokens) {
            fetchUserProfile(authTokens);
        } else {
            setUser(null);
            setAuthLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authTokens]);

    const handleAPIError = (
    error,
    defaultMessage = "Something Went Wrong! Try Again"
        ) => {
            console.log(error);

            if (error.response && error.response.data) {
            const errorMessage = Object.values(error.response.data).flat().join("\n");
            setErrorMsg(errorMessage);
            return { success: false, message: errorMessage };
            }
            setErrorMsg(defaultMessage);
            return {
            success: false,
            message: defaultMessage,
            };
        };

    // Update User profile
    const updateProfile = async (data) =>{
        setErrorMsg("");
        try{
            await apiClient.put("/auth/users/me/",data,{
                headers:{
                    Authorization: `JWT ${authTokens?.access}`
                },
            })
        }
        catch(error){
            return handleAPIError(error);
        }
    }


    //Fetch Users
    const fetchUserProfile = async (tokens = authTokens) =>{
        const requestId = ++profileRequestId.current;
        if (!tokens?.access) {
            setUser(null);
            setAuthLoading(false);
            return null;
        }
        setAuthLoading(true);
        setErrorMsg("");
        try{
            const response = await apiClient.get("/auth/users/me/",{
                headers : {Authorization: `JWT ${tokens.access}`},
            });
            if (requestId === profileRequestId.current) setUser(response.data);
            return response.data;
        }
        catch(error){
            if (requestId === profileRequestId.current) {
                setUser(null);
                setErrorMsg(error.response?.data?.detail || "Could not load your account.");
                console.log("Profile fetch error",error.response?.data || error);
            }
            return null;
        } finally {
            if (requestId === profileRequestId.current) setAuthLoading(false);
        }
    }

    //login user
    const loginUser = async (userData) =>{
        setErrorMsg("");
        try{
            const response = await apiClient.post("/auth/jwt/create/",userData);
            setAuthTokens(response.data);
            localStorage.setItem("authTokens",JSON.stringify(response.data));
            
            await fetchUserProfile(response.data);
            return { success: true}
        }catch(error){
            setErrorMsg(error.response.data?.detail);
            return { success: false}
        }
    }

    //Register User
    const registerUser = async (userData) =>{
        try{
            await apiClient.post("/auth/users/",userData);
            return{
                success: true, 
                message:"Registration Successfull,Check your Email activate your account. Redirecting...."
            }
        }catch(error){
            return handleAPIError(error,"Registration failed! try again");
        }
    }

    //Logout user
    const logoutUser = async () =>{
        profileRequestId.current += 1;
        setAuthTokens(null);
        setUser(null);
        setAuthLoading(false);
        localStorage.removeItem("authTokens")
    }

    const clearError = () => setErrorMsg(null);

    return {user,errorMsg,authLoading,loginUser, registerUser, logoutUser,fetchUserProfile,updateProfile,clearError};
}

export default useAuth;
