import React from "react";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Seller":
        return "badge-warning";
      case "Buyer":
        return "badge-info";
      default:
        return "badge-error";
    }
  };

  return (
    <div className="sticky top-0 z-50 px-3 pt-3 md:px-6">
      <div className="navbar max-w-7xl mx-auto rounded-2xl border border-white/70 bg-white/90 px-4 shadow-[0_12px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl md:px-6">

        {/* Left: Logo */}
        <div className="flex-1">
          <button
            onClick={() => navigate("/")}
            className="ml-2 text-xl font-black tracking-tight text-[#0F172A] md:text-2xl"
          >
            Virtual
            <span className="text-[#F97316]">B</span>
            azar
            <span className="text-[#3B82F6]">.</span>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex gap-1 rounded-full bg-[#F1F5F9] p-1">

            <Link
              to={user ? "/dashboard" : "/"}
              className="rounded-full px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-white hover:text-[#0F172A]"
            >
              {user ? "Dashboard" : "Home"}
            </Link>

            <Link
              to="/services"
              className="rounded-full px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-white hover:text-[#0F172A]"
            >
              Services
            </Link>

            <Link
              to="/about"
              className="rounded-full px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-white hover:text-[#0F172A]"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="rounded-full px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-white hover:text-[#0F172A]"
            >
              Contact
            </Link>

          </div>
        </div>

        {/* Right: Avatar + Mobile Menu */}
        <div className="flex flex-1 items-center justify-end gap-2">

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
              className="menu menu-sm dropdown-content mt-3 z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link
                  to={user ? "/dashboard" : "/"}
                  className="font-medium text-gray-600 transition hover:text-green-700"
                >
                  {user ? "Dashboard" : "Home"}
                </Link>
              </li>

              <li>
                <Link to="/services">Services</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Avatar Dropdown */}
          <div>
            {user ? (
              <div className="dropdown dropdown-end">

                {/* Avatar */}
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

                {/* Dropdown Menu */}
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content z-1 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                >

                  {/* User Information */}
                  <div className="py-3">
                    <div className="font-semibold text-black">
                      {user?.name}
                    </div>

                    <div className="text-sm text-black">
                      {user?.email}
                    </div>

                    <div
                      className={`badge badge-sm mt-1 ${getRoleBadgeColor(
                        user?.role
                      )}`}
                    >
                      {user?.role?.toUpperCase() || "ADMIN"}
                    </div>
                  </div>

                  {/* Profile */}
                  <li>
                    <button
                      onClick={() => navigate("/dashboard/profile")}
                      className="justify-between"
                    >
                      Profile
                      <span className="badge">New</span>
                    </button>
                  </li>

                  {/* Settings */}
                  <li>
                    <button
                      onClick={() => navigate("/dashboard/profile")}
                    >
                      Settings
                    </button>
                  </li>

                  {/* Logout */}
                  <li>
                    <button onClick={handleLogout}>
                      Logout
                    </button>
                  </li>

                </ul>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="btn btn-ghost rounded-xl text-[#0F172A]"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="btn rounded-xl border-0 bg-[#0F172A] text-white hover:bg-[#F97316]"
                >
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
