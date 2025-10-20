import React, { useEffect, useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import WelcomeCard from './shared/WelcomeCard';
import StatCard from './shared/StatCard';
import QuickAction from './shared/QuickAction';
import useFetchSellerService from '../../hooks/useFetchSellerService';
import authApiClient from '../../api_services/auth-api-client';
import useFetchOrders from '../../hooks/useFetchOrders';
import useFetchRecentOrders from '../../hooks/useFetchRecentOrders';


const SellerDashboard = () => {
  const { user } = useAuthContext();
  const {services} = useFetchSellerService();
  const [totalearnings,setTotalEarninngs] = useState(0)
  const [loading,setLoading] = useState(false)
  const{orders} = useFetchOrders();

  const{recentOrders} = useFetchRecentOrders();

  useEffect(() => {
    setLoading(true)
    try{
      authApiClient.get("/seller-earnings/").
      then((res) => setTotalEarninngs(res.data.total_earnings))
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false)
    }
  },[])

  const stats = [
    { title: 'My Services', value: loading ? "..." : services.length , icon: 'bi-box-seam', color: 'bg-primary'},
    { title: 'Sales', value: loading ? "..." : totalearnings , icon: 'bi-currency-dollar', color: 'bg-success' },
    { title: 'Orders', value: loading ? "..." : orders.length , icon: 'bi-cart-check', color: 'bg-warning'},
  ];

  const quickActions = [
    { to:"/dashboard/add-service", title: 'Add Service', description: 'Discover new services to buy', icon: 'bi-search', color: 'bg-primary' },
    { to:"/dashboard/orders", title: 'My Orders', description: 'Track your recent order', icon: 'bi-cart-check', color: 'bg-success' },
  ];


  // const topProducts = [
  //   { name: 'Autocad 2D 3D', sales: 45, revenue: '$4,049.55', trend: '+12%', image: '' },
  //   { name: 'Content Writing', sales: 32, revenue: '$6,399.68', trend: '+8%', image: '' },
  //   { name: 'SEO Keyword Research', sales: 28, revenue: '$1,287.72', trend: '+15%', image: '' },
  //   { name: 'UI/UX Design', sales: 67, revenue: '$1,339.33', trend: '+5%', image: '' }
  // ];

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'Processing': return 'badge-warning';
  //     case 'Shipped': return 'badge-info';
  //     case 'Delivered': return 'badge-success';
  //     default: return 'badge-neutral';
  //   }
  // };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <WelcomeCard
        user={user} 
        message="Track your sales and manage your products."
        icon="bi-shop"
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
          <h2 className="text-lg font-semibold text-neutral mb-4">Seller Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action}/>
            ))}
          </div>
        </div>
      </div>

      {/* Seller Specific Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card bg-white shadow-sm border border-base-300">
      <div className="card-body p-6">
        <h2 className="text-lg font-semibold text-neutral mb-4">
          Recent Orders
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <span className="loading loading-spinner text-neutral loading-xl"></span>
          </div>
        ) : recentOrders.length > 0 ? (
          <ul className="space-y-4">
            {recentOrders.map((order, index) => (
              <li
                key={order.id}
                className="flex items-center justify-between border-b border-gray-200 pb-4"
              >
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {order.buyer.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {index + 1}. {order.buyer}
                    </span>
                    <span className="text-gray-500 text-sm">{order.service}</span>
                    <span className="text-gray-400 text-xs">{order.time}</span>
                  </div>
                </div>

                {/* Order Info */}
                <div className="flex flex-col items-end">
                  <span className="font-semibold">{order.amount}</span>
                  <span
                    className={`badge ${
                      order.status === "Processing"
                        ? "badge-warning"
                        : order.status === "Shipped"
                        ? "badge-info"
                        : order.status === "Delivered"
                        ? "badge-success"
                        : "badge-neutral"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent orders found.</p>
        )}
      </div>
    </div>

        {/* Top Products */}
        {/* <div className="card bg-white shadow-sm border border-base-300">
          <div className="card-body p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral">Top Services</h3>
              <button className="btn btn-sm btn-ghost">
                <i className="bi bi-bar-chart"></i>
              </button>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100 transition-colors">
                  <div className="avatar">
                    <div className="w-12 rounded-lg">
                      <img src={product.image} alt={product.name} crossOrigin="anonymous" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral">{product.name}</p>
                    <p className="text-xs text-neutral/70">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral">{product.revenue}</p>
                    <div className="flex items-center gap-1 text-xs text-success">
                      <i className="bi bi-arrow-up"></i>
                      <span>{product.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* Sales Analytics */}
      {/* <div className="card bg-white shadow-sm border border-base-300">
        <div className="card-body p-6">
          <h3 className="text-lg font-semibold text-neutral mb-4">Sales Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">87%</div>
              <div className="text-sm text-neutral/70">Conversion Rate</div>
              <div className="w-full bg-base-200 rounded-full h-2 mt-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-success">4.8</div>
              <div className="text-sm text-neutral/70">Avg Rating</div>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i key={star} className={`bi bi-star${star <= 4 ? '-fill' : ''} text-warning text-sm`}></i>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">2.3s</div>
              <div className="text-sm text-neutral/70">Response Time</div>
              <div className="w-full bg-base-200 rounded-full h-2 mt-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-info">94%</div>
              <div className="text-sm text-neutral/70">Customer Satisfaction</div>
              <div className="w-full bg-base-200 rounded-full h-2 mt-2">
                <div className="bg-info h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SellerDashboard;
