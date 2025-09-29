import React from 'react';

import useAuthContext from '../../hooks/useAuthContext';
import QuickAction from './shared/QuickAction';
import StatCard from './shared/StatCard';
import WelcomeCard from './shared/WelcomeCard';

const BuyerDashboard = () => {
  const { user } = useAuthContext();
  console.log(user.first_name);

  const stats = [
    { title: 'Orders', value: '23', icon: 'bi-cart-check', color: 'bg-primary'},
    { title: 'Spent', value: '$1,847', icon: 'bi-currency-dollar', color: 'bg-success'},
    { title: 'Reviews', value: '18', icon: 'bi-star', color: 'bg-warning' }
  ];

  const quickActions = [
    { title: 'Browse Services', description: 'Discover new services to buy', icon: 'bi-search', color: 'bg-primary' },
    { title: 'My Orders', description: 'Track your recent purchases', icon: 'bi-cart-check', color: 'bg-success' },
    { title: 'Wishlist', description: 'View saved items', icon: 'bi-heart', color: 'bg-error' },
    { title: 'Profile', description: 'Update account information', icon: 'bi-person-circle', color: 'bg-info' }
  ];

  const recentOrders = [
  { 
    id: '#ORD-101', 
    service: 'Logo Design', 
    seller: 'CreativeStudio', 
    amount: '$89.99', 
    status: 'Delivered', 
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=60&h=60&fit=crop'
  },
  { 
    id: '#ORD-102', 
    service: 'Web Development', 
    seller: 'CodeMasters', 
    amount: '$199.99', 
    status: 'Shipped', 
    date: '2024-01-14',
    image: 'https://images.unsplash.com/photo-1581090700227-4c4f50b8d01c?w=60&h=60&fit=crop'
  },
  { 
    id: '#ORD-103', 
    service: 'Content Writing', 
    seller: 'WordSmiths', 
    amount: '$45.99', 
    status: 'Processing', 
    date: '2024-01-13',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=60&h=60&fit=crop'
  }
];



  const recommendations = [
  { 
    name: 'Logo Design', 
    price: '$29.99', 
    rating: 4.5, 
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=60&h=60&fit=crop'
  },
  { 
    name: 'SEO Optimization', 
    price: '$19.99', 
    rating: 4.8, 
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1504691342899-9ea0e96e82ed?w=60&h=60&fit=crop'
  },
  { 
    name: 'Content Writing', 
    price: '$12.99', 
    rating: 4.3, 
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=60&h=60&fit=crop'
  }
];


  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'badge-warning';
      case 'Shipped': return 'badge-info';
      case 'Delivered': return 'badge-success';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <WelcomeCard
        user={user}
        message="Discover great products and track your orders."
        icon="bi-person"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card bg-white shadow-sm border border-base-300">
        <div className="card-body p-6">
          <h2 className="text-lg font-semibold text-neutral mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} onClick={() => console.log(`Buyer action: ${action.title}`)} />
            ))}
          </div>
        </div>
      </div>

      {/* Buyer Specific Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card bg-white shadow-sm border border-base-300">
          <div className="card-body p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral">Recent Orders</h3>
              <button className="btn btn-sm btn-ghost">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100 transition-colors">
                  <div className="avatar">
                    <div className="w-12 rounded-lg">
                      <img src={order.image} alt={order.service} crossOrigin="anonymous" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-neutral">{order.service}</p>
                      <div className={`badge badge-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                    <p className="text-xs text-neutral/70">{order.seller} • {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral">{order.amount}</p>
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
      <div className="card bg-white shadow-sm border border-base-300">
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
      </div>
      </div>

      

    </div>
  );
};

export default BuyerDashboard;
