

import StatCard from '../Dashboard/shared/StatCard';
import QuickAction from '../Dashboard/shared/QuickAction';
import WelcomeCard from '../Dashboard/shared/WelcomeCard';
import useAuthContext from '../../hooks/useAuthContext';

const AdminDashboard = () => {
  const { user } = useAuthContext();
    console.log(user);
  const stats = [
    { title: 'Total Users', value: '2,847', icon: 'bi-people', color: 'bg-primary' },
    { title: 'Revenue', value: '$45,231', icon: 'bi-currency-dollar', color: 'bg-success'},
    { title: 'Orders', value: '1,423', icon: 'bi-cart-check', color: 'bg-warning'},
    { title: 'Services', value: '892', icon: 'bi-box-seam', color: 'bg-info'}
  ];

  const quickActions = [
    { title: 'Manage User', description: 'Create a new user account', icon: 'bi-person-plus', color: 'bg-primary' },
    { title: 'View Reports', description: 'Check system analytics', icon: 'bi-graph-up', color: 'bg-success' },
    { title: 'Manage Services', description: 'Add or edit products', icon: 'bi-box-seam', color: 'bg-warning' },
    { title: 'System Settings', description: 'Configure system preferences', icon: 'bi-gear', color: 'bg-info' }
  ];

  const recentUsers = [
    { name: 'John Smith', email: 'john@example.com', role: 'Buyer', time: '2 minutes ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Seller', time: '5 minutes ago', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
    { name: 'Mike Wilson', email: 'mike@example.com', role: 'Buyer', time: '10 minutes ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { name: 'Emma Davis', email: 'emma@example.com', role: 'Seller', time: '15 minutes ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' }
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

      {/* Admin Specific Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="card bg-white shadow-sm border border-base-300">
          <div className="card-body p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral">Recent Users</h3>
              <button className="btn btn-sm btn-ghost">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-100 transition-colors">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.avatar} alt={user.name} crossOrigin="anonymous" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral">{user.first_name}</p>
                    <p className="text-xs text-neutral/70">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <div className={`badge badge-sm ${user.role === 'Seller' ? 'badge-warning' : 'badge-info'}`}>
                      {user.role}
                    </div>
                    <p className="text-xs text-neutral/70 mt-1">{user.time}</p>
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

export default AdminDashboard;
