"use client";

import { useState } from "react";
import { signup } from "@/services/authService";
import { validatePassword } from "@/utils/validators";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [email, setEmail] = useState<string>(""); 
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>(""); 
  const [confirmPassword, setConfirmPassword] = useState<string>(""); 
  const [error, setError] = useState<string>(""); 
  const [success, setSuccess] = useState<string>(""); 
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setError(passwordValidationError);
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      const response = await signup({ email, username, password });
      setSuccess(`Welcome, ${response.username}! ${response.message}`);
      setError("");
      setTimeout(() => router.push("/login"), 3000); 
    } catch (err: any) {
      setSuccess("");
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Signup</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-900 transition">
            Signup
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button onClick={redirectToLogin} className="text-gray-800 hover:underline">Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
