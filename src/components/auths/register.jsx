import React, { useState } from "react";
// import { useAuth } from '../../context/authContext'
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRegisterMutation } from "../../queries";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // const { register, loading } = useAuth()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isPending, mutateAsync } = useRegisterMutation();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Email domain check (optional)
    // const validDomains = ['edu', 'ac', 'school', 'university']
    // const domain = formData.email.split('@')[1]?.split('.')[1]
    // if (!validDomains.includes(domain)) {
    //   setError('Please use an educational email address')
    //   return
    // }

    try {
      const result = await mutateAsync({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

     navigate('/dashboard')

      if (!result.success) {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-sm text-red-400 text-center">{error}</p>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-neutral-400 ml-1">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-white/30 focus:ring-1 focus:ring-white/30 outline-none transition-all"
          placeholder="John Doe"
          disabled={isPending}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-neutral-400 ml-1">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-white/30 focus:ring-1 focus:ring-white/30 outline-none transition-all"
          placeholder="name@school.edu"
          disabled={isPending}
        />
        <p className="text-xs text-neutral-500 ml-1">
          Please use your  email
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-neutral-400 ml-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-white/30 focus:ring-1 focus:ring-white/30 outline-none transition-all pr-10"
            placeholder="At least 6 characters"
            disabled={isPending}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
          >
            {showPassword ? (
              <EyeOff size={16} className="text-neutral-300 hover:text-white" />
            ) : (
              <Eye size={16} className="text-neutral-300 hover:text-white" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-neutral-400 ml-1">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-white/30 focus:ring-1 focus:ring-white/30 outline-none transition-all pr-10"
            placeholder="Confirm your password"
            disabled={isPending}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
          >
            {showConfirmPassword ? (
              <EyeOff size={16} className="text-neutral-300 hover:text-white" />
            ) : (
              <Eye size={16} className="text-neutral-300 hover:text-white" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-start space-x-2 text-xs text-neutral-400">
        <input
          type="checkbox"
          id="terms"
          className="rounded border-white/10 bg-[#0a0a0a] mt-0.5"
        />
        <label htmlFor="terms">
          I agree to the{" "}
          <a href="#" className="text-white hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-white hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-white text-black hover:bg-neutral-200 font-medium text-sm py-2.5 rounded-lg  cursor-pointer
        transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isPending ? (
          <>
      <Loader size={16} />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default Register;
