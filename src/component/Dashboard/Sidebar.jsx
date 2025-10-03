import { 
  FiBarChart2, 
  FiShoppingCart, 
  FiStar, 
  FiUsers, 
  FiPlusCircle, 
  FiTag, 
  FiBox, 
  FiClipboard 
} from "react-icons/fi";

// import React, { useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import { Link, useNavigate } from "react-router";


const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();
    const navigate = useNavigate();


const buyerMenus = [
  { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
  { to: "/services", icon: FiBox, label: "Services" },
  { to: "/dashboard/orders", icon: FiClipboard, label: "Orders" },
  { to: "/reviews", icon: FiStar, label: "Reviews" },
];

const adminMenus = [
  { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
  { to: "/users", icon: FiUsers, label: "Users" },
  { to: "/categories", icon: FiTag, label: "Categories" },
  { to: "/categories/add", icon: FiPlusCircle, label: "Add Category" },
  { to: "/dashboard/orders", icon: FiClipboard, label: "Orders" },
  { to: "/reviews", icon: FiStar, label: "Reviews" },
];

const sellerMenus = [
  { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
  { to: "/dashboard/my-services", icon: FiBox, label: "My Services" },
  { to: "/dashboard/add-service", icon: FiPlusCircle, label: "Add Service" },
  { to: "/dashboard/orders", icon: FiClipboard, label: "Orders" },
  { to: "/reviews", icon: FiStar, label: "Reviews" },
];


  const menuItems = user.role === "Seller" ? sellerMenus : user.role === "Buyer" ? buyerMenus : adminMenus ;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-full bg-gray-200 text-black shadow-lg  border-base-200 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between p-4 border-base-300">
            <div className="flex items-center gap-2">
              <button
                    onClick={() => navigate("/")}
                    className="text-green-700 text-2xl ml-2 font-bold"
                >
                    Virtual<span className="font-bold text-3xl">B</span>azar
            </button>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle lg:hidden"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* User Info */}
          <div className="p-4  border-base-300">
            <div className="flex items-center gap-3">
              <div className="avatar text-black">
                <div className="w-10 rounded-full">
                  {user?.avatar ? (
                    <img
                      alt="Profile"
                      src={user.avatar}
                      crossOrigin="anonymous"
                      className="text-black rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-primary-100  rounded-full border-2 flex items-center justify-center">
                      <i className="bi bi-person-fill text-primary-600">Profile</i>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-neutral truncate">{user?.first_name+ " " + user?.last_name}</div>
                <div className="text-sm text-neutral/70 truncate">{user?.email}</div>
                <div className={`badge badge-xs mt-1 ${
                  user?.role === "Buyer" ? 'badge-info' :
                  user?.role === 'Seller' ? 'badge-warning' : 'badge-error'
                }`}>
                  <span>{user?.is_staff && user?.is_superuser ? "ADMIN" : user?.role?.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4 ">
            <ul className="menu menu-md px-4">
              {menuItems.map((item,index) => (
                <li key={index}
                    className="mb-4"
                >
                  <Link to={item.to} className="flex items-center">
                        <item.icon className="h-4 w-4 size-3" />
                    <span className="font-bold ">{item.label}</span>
                </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
