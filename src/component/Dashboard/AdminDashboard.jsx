

import StatCard from '../Dashboard/shared/StatCard';
import QuickAction from '../Dashboard/shared/QuickAction';
import WelcomeCard from '../Dashboard/shared/WelcomeCard';
import useAuthContext from '../../hooks/useAuthContext';
import useFetchUsers from '../../hooks/useFetchUsers';
import useFetchOrders from '../../hooks/useFetchOrders';
import { useEffect, useState } from 'react';
import apiClient from '../../api_services/api-client';

const AdminDashboard = () => {
  const { user } = useAuthContext();
  const{summary} = useFetchUsers();
  const{orders} = useFetchOrders();
  const[services,setServices] =useState([]);

  useEffect(() => {
    apiClient.get("/services/").then((res) => setServices(res.data))
  },[setServices])
  console.log("admin",services);

  console.log("summari",summary);
  const stats = [
    { title: 'Total Users', value: summary.total_users, icon: 'bi-people', color: 'bg-primary' },
    { title: 'Revenue', value: `$${summary.total_revenue}`,icon: 'bi-currency-dollar', color: 'bg-success'},
    { title: 'Orders', value: orders.length, icon: 'bi-cart-check', color: 'bg-warning'},
    { title: 'Services', value: services.count, icon: 'bi-box-seam', color: 'bg-info'}
  ];

  const quickActions = [
    { to:"/dashboard/manage-user" , title: 'Manage User', description: 'Create a new user account', icon: 'bi-person-plus', color: 'bg-primary' },
    { to:"/dashboard/manage-service" , title: 'Manage Services', description: 'Delete Services', icon: 'bi-box-seam', color: 'bg-warning' },
  ];



  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <WelcomeCard 
        user={user} 
        message="Manage your platform and monitor system performance."
        icon="bi-shield-check"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card bg-white shadow-sm border border-base-300">
        <div className="card-body p-6">
          <h2 className="text-lg font-semibold text-neutral mb-4">Admin Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} onClick={() => console.log(`Admin action: ${action.title}`)} />
            ))}
          </div>
        </div>
      </div>

      {/* Top Sellers & Buyers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Top Sellers */}
        <div className="card bg-white shadow-xl border border-gray-200 rounded-lg">
          <div className="card-body p-8">
            <h2 className="text-2xl font-bold text-neutral mb-6">Top Sellers</h2>
            {summary.top_sellers && summary.sellers.length > 0 ? (
              <ul className="space-y-6">
                {summary.top_sellers.map((seller, index) => (
                  <li 
                    key={seller.id} 
                    className="flex justify-between items-center border-b border-gray-200 pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Avatar */}
                      <img 
                        src={seller.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                        alt={`${seller.first_name} ${seller.last_name}`} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-base font-medium">
                          {index + 1}. {seller.first_name} {seller.last_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Joined: {new Date(seller.date_joined).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="badge badge-primary text-sm py-2 px-3">
                      Services: {seller.service_count || 0}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No sellers found.</p>
            )}
          </div>
        </div>

      {/* Top Buyers */}
      <div className="card bg-white shadow-xl border border-gray-200 rounded-lg">
        <div className="card-body p-8">
          <h2 className="text-2xl font-bold text-neutral mb-6">Top Buyers</h2>
          {summary.top_buyers && summary.buyers.length > 0 ? (
            <ul className="space-y-6">
              {summary.top_buyers.map((buyer, index) => (
                <li 
                  key={buyer.id} 
                  className="flex justify-between items-center border-b border-gray-200 pb-4"
                >
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <img 
                      src={buyer.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                      alt={`${buyer.first_name} ${buyer.last_name}`} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-base font-medium">
                        {index + 1}. {buyer.first_name} {buyer.last_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Joined: {new Date(buyer.date_joined).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="badge badge-secondary text-sm py-2 px-3">
                    Orders: {buyer.order_count || 0}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No buyers found.</p>
          )}
        </div>
      </div>
    </div>
  
          
    </div>
  );
};

export default AdminDashboard;
