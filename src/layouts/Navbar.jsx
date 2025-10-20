import React from "react";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
    const {user,logoutUser} = useAuthContext();
  const navigate = useNavigate();

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Seller': return 'badge-warning';
      case 'Buyer': return 'badge-info';
      default: return 'badge-error';
    }
  };

  return (
    <div>
      <div className="navbar bg-white shadow-sm">
        {/* Left: Logo */}
        <div className="flex-1">
          <button
            onClick={() => navigate("/")}
            className="text-green-700 text-2xl ml-2 font-bold"
          >
            Virtual<span className="font-bold text-3xl">B</span>azar
          </button>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex-1 hidden md:flex justify-center">
          <div className="flex gap-6">
            <Link
              to={user ? ("/dashboard") : ("/")}
              className="font-medium text-gray-600 hover:text-green-700 transition"
            >
              {user && ("Dashboard")}
              {!user && ("Home")}
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

        {/* Right: Avatar + Mobile Menu */}
        <div className="flex-1 flex justify-end items-center gap-2">
          {/* Mobile Menu Button */}
          <div className="dropdown dropdown-end md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

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
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
           
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
            {user && (
              <div className="py-3 ">
                    <div className="font-semibold text-black">{user?.name}</div>
                    <div className="text-sm text-black">{user?.email}</div>
                    <div className={`badge badge-sm mt-1 ${getRoleBadgeColor(user?.role)}`}>
                      {user?.role?.toUpperCase() || "ADMIN"}
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
              <li><button onClick={() => navigate("/dashbaord/profile")}>Settings</button></li>
              <li><button onClick={logoutUser}>Logout</button></li>
            </ul>
          </div>
          ):(
            <div className="grid grid-cols-2 gap-2">
                <Link to="/login" className="btn btn-neutral">Sign In</Link>
                <Link to="/register" className="btn btn-neutral">Sign Up</Link>

            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
