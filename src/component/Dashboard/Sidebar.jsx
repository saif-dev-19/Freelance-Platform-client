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
import { NavLink, useNavigate } from "react-router";


const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();
    const navigate = useNavigate();


const buyerMenus = [
  { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
  { to: "/services", icon: FiBox, label: "Services" },
  { to: "/dashboard/orders", icon: FiClipboard, label: "Orders" },
];

const adminMenus = [
  { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
  { to: "/dashboard/manage-user", icon: FiUsers, label: "Users" },
  { to: "/dashboard/categories", icon: FiTag, label: "Categories" },
  { to: "/dashboard/add-category", icon: FiPlusCircle, label: "Add Category" },
  { to: "/dashboard/orders", icon: FiClipboard, label: "Orders" },

];

const sellerMenus = [
  { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
  { to: "/dashboard/my-services", icon: FiBox, label: "My Services" },
  { to: "/dashboard/add-service", icon: FiPlusCircle, label: "Add Service" },
  { to: "/dashboard/orders", icon: FiClipboard, label: "Orders" },
];


  const menuItems = user?.role === "Seller" ? sellerMenus : user?.role === "Buyer" ? buyerMenus : adminMenus ;

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
        className={`fixed left-0 top-0 z-50 min-h-full w-64 border-r border-slate-200 bg-[#0F172A] text-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div className="flex items-center gap-2">
              <button
                    onClick={() => navigate("/")}
                    className="ml-2 text-2xl font-black tracking-tight text-white"
                >
                    Virtual<span className="text-[#F97316]">B</span>azar<span className="text-[#38BDF8]">.</span>
            </button>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle text-white lg:hidden"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* User Info */}
          <div className="border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <div className="avatar text-black">
                <div className="w-10 rounded-full">
                  {user?.avatar ? (
                    <img
                      alt="Profile"
                      src={user.avatar}
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
                <div className="truncate font-semibold text-white">{user?.first_name+ " " + user?.last_name}</div>
                <div className="truncate text-sm text-slate-400">{user?.email}</div>
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
          <nav className="flex-1 overflow-y-auto py-5">
            <ul className="space-y-2 px-3">
              {menuItems.map((item,index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/dashboard"}
                    onClick={() => window.innerWidth < 1024 && onClose()}
                    className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-[#F97316] text-white shadow-lg shadow-orange-950/20" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </NavLink>
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
