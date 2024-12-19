"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/services/passwordService";

const ResetPasswordForm = ({ token: propToken }: { token?: string }) => {
  const [newPassword, setNewPassword] = useState<string>(""); 
  const [confirmPassword, setConfirmPassword] = useState<string>(""); 
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>(""); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (propToken) {
      setToken(propToken);
    } else {
      const queryToken = searchParams?.get("token");
      if (queryToken) {
        setToken(queryToken);
      } else {
        setError("Invalid or missing reset token.");
      }
    }
  }, [propToken, searchParams]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setMessage("");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setIsSubmitting(true);
      const responseMessage = await resetPassword(token, newPassword);
      setMessage(responseMessage || "Password reset successfully.");
      setError("");

      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setMessage("");
      setError(err.response?.data?.message || "Failed to reset password. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Reset Password
        </h1>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="new-password" className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 text-white rounded transition ${
              isSubmitting ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
