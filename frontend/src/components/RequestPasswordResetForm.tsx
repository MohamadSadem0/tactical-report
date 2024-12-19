"use client";

import { useState } from "react";
import { requestPasswordReset } from "@/services/passwordService";

const RequestPasswordResetForm = () => {
  const [email, setEmail] = useState<string>(""); 
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>(""); 

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const responseMessage = await requestPasswordReset(email);
      setMessage(responseMessage);
      setError("");
    } catch (err: any) {
      setMessage("");
      setError(err.response?.data?.message || "Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Request Password Reset
        </h1>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRequestReset}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestPasswordResetForm;
