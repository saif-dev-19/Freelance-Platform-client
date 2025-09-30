import React from 'react';
import AdminDashboard from './AdminDashboard';
import BuyerDashboard from './BuyerDashboard';
import SellerDashboard from './SellerDashboard';
import useAuthContext from '../../hooks/useAuthContext';

const DashboardBody = () => {
  const {user} = useAuthContext();
  
  return (
    <div className=''>

      {user.role === "Seller" ? <SellerDashboard /> : user.role === "Buyer" ? <BuyerDashboard /> : <AdminDashboard />}
        
    </div>
  );
};

export default DashboardBody;