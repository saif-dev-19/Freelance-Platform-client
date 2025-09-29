import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { FiMenu } from "react-icons/fi";
import authApiClient from "../../api_services/auth-api-client";

const Navbar = ({ toggleSidebar }) => {
  const { user, logoutUser } = useAuthContext();
  const navigate = useNavigate();
  const [totalearnings,setTotalEarninngs] = useState(null);

  const handleLogOut = () => {
    logoutUser();
    navigate("/");
  };

  useEffect(() =>{
    authApiClient.get("/seller-earnings/").
    then((res) => setTotalEarninngs(res.data.total_earnings))
  },[])

  const getRoleBadgeColor = () => {
    if (user?.role === "Seller") return "badge-warning";
    else if (user?.role === "Buyer") return "badge-info";
    else return "badge-error";
  };

  return (
    <div>
      <div className="navbar bg-white shadow-sm">
        {/* Left: Sidebar toggle + Logo */}
        <div className="flex-1 flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="btn btn-ghost btn-circle lg:hidden"
          >
            <FiMenu className="text-xl" />
          </button>
          <span className="text-black text-xl font-bold">Dashboard</span>
        </div>

        {/* Center: Navigation Links (desktop only) */}
        <div className="flex-1 hidden md:flex justify-center">
          <div className="flex gap-6">
            <Link
              to="/"
              className="font-medium text-gray-600 hover:text-green-700 transition"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="font-medium text-gray-600 hover:text-green-700 transition"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="font-medium text-gray-600 hover:text-green-700 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="font-medium text-gray-600 hover:text-green-700 transition"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right: Avatar + Earnings + Login/Register */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {/* Earnings badge (only Seller) */}
          {user?.role === "Seller" && (
            <div className="flex items-center bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full shadow-sm text-sm font-medium">
              <span>${totalearnings || 0}</span>
            </div>
          )}

          {/* Avatar Dropdown */}
          <div>
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User avatar"
                      src={
                        user.avatar ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  {user && (
                    <div className="py-3">
                      <div className="font-semibold text-black">
                        {user?.first_name}
                      </div>
                      <div className="text-sm text-black">{user?.email}</div>
                      <div
                        className={`badge badge-sm mt-1 ${getRoleBadgeColor(
                          user?.is_staff || user.role
                        )}`}
                      >
                        {user.is_staff ? "ADMIN" : user?.role?.toUpperCase()}
                      </div>
                    </div>
                  )}

                  <li>
                    <button
                      onClick={() => navigate("/dashboard/profile")}
                      className="justify-between"
                    >
                      Profile <span className="badge">New</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate("/settings")}>
                      Settings
                    </button>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" className="btn btn-neutral">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-neutral">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


