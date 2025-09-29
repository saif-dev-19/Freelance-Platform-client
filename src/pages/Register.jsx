import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../component/ErrorAlert";

const Register = () => {
  const navigate = useNavigate();
    const {registerUser,errorMsg} = useAuthContext();
  const [successMsg,setSuccessMsg] = useState("")
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

 

  const onSubmit = async (data) => {
    delete data.confirmPassword;
    try {
      const response = await registerUser(data);
      if (response.success) {
        setSuccessMsg(response.message);
        // setTimeout(() => navigate("/login"), 3000);
        // navigate("/login")
      }
    } catch (error) {
      console.log("Registration failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md my-8 bg-gray-200 rounded-xl shadow-lg p-8">
        {errorMsg && <ErrorAlert error={errorMsg} />}
        {successMsg && (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}
        <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full bg-white text-black "
            {...register("first_name", { required: "First name is required" })}
          />
          {errors.first_name && (
            <p className="text-red-500 text-xs">{errors.first_name.message}</p>
          )}

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full bg-white text-black "
            {...register("last_name", { required: "Last name is required" })}
          />
          {errors.last_name && (
            <p className="text-red-500 text-xs">{errors.last_name.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full bg-white text-black "
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full bg-white text-black "
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full bg-white text-black "
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}

          {/* Role */}
          <select
            className="select select-bordered w-full bg-white text-black"
            {...register("role", { required: "Role is required" })}
          >
            <option value="">Select a role</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs">{errors.role.message}</p>
          )}

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            className="input input-bordered w-full bg-white text-black "
            {...register("address")}
          />

          {/* Phone Number */}
          <input
            type="text"
            placeholder="Phone Number"
            className="input input-bordered w-full bg-white text-black "
            {...register("phone_number")}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-neutral w-full text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
