import React, { useEffect, useState } from 'react';

import useAuthContext from '../../hooks/useAuthContext';
import QuickAction from './shared/QuickAction';
import StatCard from './shared/StatCard';
import WelcomeCard from './shared/WelcomeCard';
import useFetchOrders from '../../hooks/useFetchOrders';
import useFetchReviews from '../../hooks/useFetchReviews';
import default_img from '../../assets/images/default.png';


const BuyerDashboard = () => {
  const { user } = useAuthContext();
  console.log(user.first_name);
  const {orders,loading } = useFetchOrders();
  const [spent, setSpent] = useState(0);
  const [recentOrders, setOrders] = useState([]);



  useEffect(() => {
    if (orders && orders.length > 0) {
      const totalSpent = orders
        .filter(order => order.status === "Completed") 
        .reduce((total, order) => total + order.total_price, 0);

      setSpent(totalSpent);
    }
  }, [orders]);

  const {reviews} = useFetchReviews();
  console.log("review",reviews);

  console.log("Total spent:", spent);
  

  

  const stats = [
    { title: 'Orders', value: loading ? "..." : orders.length, icon: 'bi-cart-check', color: 'bg-primary'},
    { title: 'Spent', value: loading ? "..." : `$${spent}`, icon: 'bi-currency-dollar', color: 'bg-success'},
    { title: 'Reviews', value: loading ? "..." : reviews.length, icon: 'bi-star', color: 'bg-warning' }
  ];

  const quickActions = [
    { to:"/services", title: 'Browse Services', description: 'Discover new services to buy', icon: 'bi-search', color: 'bg-primary' },
    { to:"/dashboard/orders", title: 'My Orders', description: 'Track your recent purchases', icon: 'bi-cart-check', color: 'bg-success' },
    { to:"/dashboard/profile", title: 'Profile', description: 'Update account information', icon: 'bi-person-circle', color: 'bg-info' }
  ];

  

  useEffect(() => {
    setOrders(orders.slice(0, 5));
  }, [orders]);

  console.log("orders",recentOrders);

//   const recentOrders = [
//   { 
//     id: '#ORD-101', 
//     service: 'Logo Design', 
//     seller: 'CreativeStudio', 
//     amount: '$89.99', 
//     status: 'Delivered', 
//     date: '2024-01-15',
//     image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=60&h=60&fit=crop'
//   },
//   { 
//     id: '#ORD-102', 
//     service: 'Web Development', 
//     seller: 'CodeMasters', 
//     amount: '$199.99', 
//     status: 'Shipped', 
//     date: '2024-01-14',
//     image: 'https://images.unsplash.com/photo-1581090700227-4c4f50b8d01c?w=60&h=60&fit=crop'
//   },
//   { 
//     id: '#ORD-103', 
//     service: 'Content Writing', 
//     seller: 'WordSmiths', 
//     amount: '$45.99', 
//     status: 'Processing', 
//     date: '2024-01-13',
//     image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=60&h=60&fit=crop'
//   }
// ];



//   const recommendations = [
//   { 
//     name: 'Logo Design', 
//     price: '$29.99', 
//     rating: 4.5, 
//     reviews: 234,
//     image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=60&h=60&fit=crop'
//   },
//   { 
//     name: 'SEO Optimization', 
//     price: '$19.99', 
//     rating: 4.8, 
//     reviews: 156,
//     image: 'https://images.unsplash.com/photo-1504691342899-9ea0e96e82ed?w=60&h=60&fit=crop'
//   },
//   { 
//     name: 'Content Writing', 
//     price: '$12.99', 
//     rating: 4.3, 
//     reviews: 89,
//     image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=60&h=60&fit=crop'
//   }
// ];


  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'badge-warning';
      case 'Shipped': return 'badge-info';
      case 'Delivered': return 'badge-success';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="space-y-7">
      {/* Welcome Section */}
      <WelcomeCard
        user={user}
        message="Discover great products and track your orders."
        icon="bi-person"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <div className="p-5 md:p-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0284C7]">Keep moving</p>
          <h2 className="mb-4 text-xl font-black text-[#0F172A]">Quick actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} />
            ))}
          </div>
        </div>
      </div>

      {/* Buyer Specific Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-[#0F172A]">Recent orders</h3>
              <button className="btn btn-sm btn-ghost">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-[#F8FAFC]">
                  <div className="avatar">
                    <div className="w-12 rounded-lg">
                      <img
                        src={order?.service?.images?.[0]?.image || default_img}
                        alt={order?.service?.title || 'Service'}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = default_img;
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-neutral">{order?.service?.title || 'Service unavailable'}</p>
                      <div className={`badge badge-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                    <p className="text-xs text-neutral/70">{order?.service?.seller || 'Seller unavailable'} • {order.created_at}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral">{order.total_price}</p>
                    <button className="btn btn-xs btn-ghost">
                      <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Recommendations */}
      {/* <div className="card bg-white shadow-sm border border-base-300">
        <div className="card-body p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral">Recommended for You</h3>
            <button className="btn btn-sm btn-ghost">
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((item, index) => (
              <div key={index} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <figure className="px-4 pt-4">
                  <img src={item.image} alt={item.name} crossOrigin="anonymous" className="rounded-lg w-full h-32 object-cover" />
                </figure>
                <div className="card-body p-4">
                  <h4 className="font-medium text-neutral text-sm">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className={`bi bi-star${star <= Math.floor(item.rating) ? '-fill' : ''} text-warning text-xs`}></i>
                      ))}
                    </div>
                    <span className="text-xs text-neutral/70">({item.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">{item.price}</span>
                    <button className="btn btn-xs btn-primary">
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>*/}
      </div>

      

    </div>
  );
};

export default BuyerDashboard;
