import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import ProfileForm from "../component/Dashboard/Profile/ProfileForm";
import PasswordChangeForm from "../component/Dashboard/Profile/PasswordChangeForm";
import ProfileButton from "../component/Dashboard/Profile/ProfileButton";
import ErrorAlert from "../component/ErrorAlert";


const Profile = () => {
    const [isEditing,setEditing ] = useState(false);
    const {user,updateProfile,changePassword,errorMsg} = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: {errors,isSubmitting},
        watch,
        setValue,
    } = useForm();

    const onSubmit = async (data) =>{
        console.log(data);
        try{
            const profilePayLoad = {
            first_name:data.first_name,
            last_name:data.last_name,
            address:data.address,
            phone_number:data.phone_number,
        }
            await updateProfile(profilePayLoad);
            // password change
            if(data.current_password && data.new_password){
                await changePassword({
                    current_password : data.current_password,
                    new_password : data.new_password,
                })
            }
            // alert("Profile Updated")
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        Object.keys(user).forEach((key) => setValue(key,user[key]));
    },[user,setValue])

    return (
        <div className='card w-full max-w-2xl mx-auto bg-base-100 shadow-xl '>
            <div className='card-body'>
            {errorMsg && <ErrorAlert error={errorMsg} />}
                <h2 className='card-title text-2xl mb-4'>Profile Information</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <ProfileForm register={register} errors={errors} isEditing={isEditing}/>
                    <PasswordChangeForm register={register} errors={errors} isEditing={isEditing} watch={watch}/>
                    <ProfileButton isEditing={isEditing} setEditing={setEditing} isSubmitting={isSubmitting}/>
                </form>
            </div>
            
        </div>
    );
};

export default Profile;