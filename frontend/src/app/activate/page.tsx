"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { activateAccount } from "@/services/authService";

const ActivationContent = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  useEffect(() => {
    const activate = async () => {
      if (!token) {
        setError("Invalid or missing activation token.");
        return;
      }

      try {
        const response = await activateAccount(token);
        setMessage(response.message || "Account activated successfully!");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      }
    };

    activate();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Account Activation</h1>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

const ActivatePage = () => {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <ActivationContent />
    </Suspense>
  );
};

export default ActivatePage;
