import React from 'react';

const ProfileButton = ({ isEditing,setEditing,isSubmitting}) => {
    return (
        <div className='flex justify-center pt-4'>
            {isEditing ? (
                <div className='space-x-4'>
                    <button type='submit' className='btn btn-neutral px-8' disabled={isSubmitting}>
                        {isSubmitting ? "Saving" : "Save Changes"}
                    </button>
                    <button type='button' className='btn btn-outline' onClick={()=> setEditing(false)}>Cancel</button>
                </div>
            ):
            (
                <button className='btn btn-neutral px-8' type='button' onClick={()=>setEditing(true)}> Edit Profile</button>
            )}
        </div>
    );
};

export default ProfileButton;