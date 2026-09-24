import React, { Children } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, authLoading} = useAuthContext();
    if (authLoading) return <p className='text-black'>Loading...</p>
    return user ? children : <Navigate to="/login" replace />
};

export default PrivateRoute;
