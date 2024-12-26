import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

type ApiResponse = {
  message: string;
};

export const requestPasswordReset = async (email: string): Promise<string> => {
  try {
    const response = await axiosInstance.post<ApiResponse>("/public/request-password-reset", { email });
    return response.data.message;
  } catch (error) {
    return handleAxiosError(error, "Failed to request password reset.");
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<string> => {
  try {
    const response = await axiosInstance.post<ApiResponse>("/public/reset-password", { token, newPassword });
    return response.data.message;
  } catch (error) {
    return handleAxiosError(error, "Failed to reset password.");
  }
};

const handleAxiosError = (error: unknown, defaultMessage: string): string => {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.data?.message) {
      return error.response.data.message;
    }
    if (error.request) {
      return "No response from server. Please try again later.";
    }
  }
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }
  return defaultMessage;
};
