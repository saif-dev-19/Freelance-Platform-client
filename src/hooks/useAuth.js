import { useEffect, useState } from "react";
import apiClient from "../api_services/api-Client";


const useAuth = () =>{
    const [user,setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const getToken =() => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;
    }

    const [authTokens,setAuthTokens] = useState(getToken());

    useEffect(() => {
        if(authTokens) fetchUserProfile();
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
    const fetchUserProfile = async () =>{
        setErrorMsg("");
        try{
            const response = await apiClient.get("/auth/users/me/",{
                headers : {Authorization: `JWT ${authTokens?.access}`},
            });
            console.log(response.data)
            setUser(response.data);
        }
        catch(error){
            setErrorMsg(error.response.data?.detail);
            console.log("Login error",error.response?.data);
        }
    }

    //login user
    const loginUser = async (userData) =>{
        setErrorMsg("");
        try{
            const response = await apiClient.post("/auth/jwt/create/",userData);
            setAuthTokens(response.data);
            localStorage.setItem("authTokens",JSON.stringify(response.data));
            
            await fetchUserProfile();
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
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens")
    }

    return {user,errorMsg,loginUser, registerUser, logoutUser,fetchUserProfile,updateProfile};
}

export default useAuth;