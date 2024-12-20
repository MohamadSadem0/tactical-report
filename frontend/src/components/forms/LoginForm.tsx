"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login as loginReduxAction } from "@/redux/userSlice";
import { login as loginService } from "@/services/authService";
import { getDecryptedData } from "@/utils/encryption";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>(""); 
  const [error, setError] = useState<string>(""); 
  const [success, setSuccess] = useState<string>(""); 
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginService({ email, password });

      dispatch(
        loginReduxAction({
          email: email,
          token: response.token,
          role: response.role,
          username: response.username,
        })
      );

      setSuccess(response.message);
      setError("");

      if(getDecryptedData("EncryptedUserRole")==="ADMIN")
      router.push("/items");
    else 
    router.push("/items/user");

    } catch (err: any) {
      setSuccess("");
      setError(err.message || "Login failed. Please try again.");
    }
  };

  const redirectToSignup = () => {
    router.push("/signup");
  };

  const redirectToForgotPassword = () => {
    router.push("/request-password-reset");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button onClick={redirectToSignup} className="text-blue-500 hover:underline">
              Signup
            </button>
          </p>
          <p className="text-sm text-gray-600">
            Forgot your password?{" "}
            <button onClick={redirectToForgotPassword} className="text-blue-500 hover:underline">
              Reset it here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
