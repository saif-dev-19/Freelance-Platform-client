import React from 'react';
import AdminDashboard from "../component/Dashboard/AdminDashboard"
import BuyerDashboard from '../component/Dashboard/BuyerDashboard';
import DashboardBody from '../component/Dashboard/DashboardBody';
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router';


const Dashboard = () => {
    const {user} = useAuthContext();
    const navigate = useNavigate();
    return (
        <div>         
            {!user && (
                navigate("/login")
            )}

            {user && (
                <DashboardBody />
            )}
            
        </div>
    );
};

export default Dashboard;