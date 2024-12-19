import axiosInstance from "@/utils/axiosInstance";

export const requestPasswordReset = async (email: string): Promise<string> => {
  const response = await axiosInstance.post("/request-password-reset", { email });
  return response.data; 
};

export const resetPassword = async (token: string, newPassword: string): Promise<string> => {
    try {
      const response = await axiosInstance.post("/reset-password", { token, newPassword });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to reset password.");
      } else if (error.request) {
        throw new Error("No response from server. Please try again later.");
      } else {
        throw new Error(error.message || "An unexpected error occurred.");
      }
    }
  };
  