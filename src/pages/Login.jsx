import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../component/ErrorAlert";
import { useNavigate } from "react-router";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { errorMsg, loginUser, clearError } = useAuthContext();

  // Demo user credentials
  const demoUsers = {
    admin: {
      email: "admin@gmail.com",
      password: "test123@#",
    },
    seller: {
      email: "seller@seller.com",
      password: "test123@#",
    },
    buyer: {
      email: "buyer@buyer.com",
      password: "test123@#",
    },
  };

  const handleDemoLogin = async (role) => {
    const credentials = demoUsers[role];
    setValue("email", credentials.email);
    setValue("password", credentials.password);
    
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      if (response && response.success) {
        clearError();
        setLoginSuccess(true);
        // Show success animation for 2 seconds before navigating
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.log("Login failed:", error);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      if (response && response.success) {
        clearError();
        setLoginSuccess(true);
        // Show success animation for 2 seconds before navigating
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.log("Login failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F1F5F9] relative">
      {/* Success Overlay */}
      {loginSuccess && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#6D28D9] to-[#3B82F6] z-50 flex items-center justify-center animate-fadeIn">
          <div className="text-center">
            {/* Success Icon with Animation */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center animate-scaleIn shadow-2xl">
                <svg className="w-20 h-20 text-[#22C55E] animate-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Ripple Effect */}
              <div className="absolute inset-0 w-32 h-32 mx-auto bg-white rounded-full animate-ping opacity-20"></div>
            </div>
            
            {/* Success Text */}
            <h2 className="text-4xl font-bold text-white mb-4 animate-slideUp">
              Login Successful!
            </h2>
            <p className="text-xl text-white/90 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Redirecting to dashboard...
            </p>
            
            {/* Loading Dots */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Demo Users Box */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100/50 p-6 mb-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Quick Demo Login</h3>
            <p className="text-sm text-gray-600">Try the platform with demo accounts</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              disabled={loading}
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#6D28D9]/10 to-[#3B82F6]/10 hover:from-[#6D28D9]/20 hover:to-[#3B82F6]/20 border-2 border-[#6D28D9]/30 rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-8 h-8 text-[#6D28D9] mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-bold text-[#6D28D9]">Admin</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoLogin("seller")}
              disabled={loading}
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#3B82F6]/10 to-[#0EA5E9]/10 hover:from-[#3B82F6]/20 hover:to-[#0EA5E9]/20 border-2 border-[#3B82F6]/30 rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-8 h-8 text-[#3B82F6] mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="text-sm font-bold text-[#3B82F6]">Seller</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoLogin("buyer")}
              disabled={loading}
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 hover:from-[#0EA5E9]/20 hover:to-[#22C55E]/20 border-2 border-[#0EA5E9]/30 rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-8 h-8 text-[#0EA5E9] mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-bold text-[#0EA5E9]">Buyer</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100/50 p-8">
          <div className="text-center mb-8">
            {errorMsg && <ErrorAlert error={errorMsg} />}
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent">Sign In</h2>
            <p className="text-gray-600 mt-2">
              Enter your email and password to access your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-[#0F172A] mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email", {
                required: "Email is required",
              })}
              className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none text-black focus:ring-2 focus:ring-[#6D28D9] transition-all ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-[#0F172A] mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full px-4 py-3 border-2 text-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9] transition-all ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white py-3 px-4 rounded-2xl font-bold hover:shadow-[0_8px_30px_rgba(109,40,217,0.3)] focus:outline-none focus:ring-2 focus:ring-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-[#6D28D9] hover:text-[#3B82F6] font-bold transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
