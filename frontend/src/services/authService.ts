import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

type LoginData = {
  email: string;
  password: string;
};

type SignupData = {
  username: string;
  email: string;
  password: string;
};

type AuthResponse = {
  role: string;
  message: string;
  token: string;
  username: string;
};

type ActivationResponse = {
  message: string;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>("/public/auth/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to log in");
    }
    throw new Error("An unexpected error occurred during login.");
  }
};

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>("/public/auth/signup", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to sign up");
    }
    throw new Error("An unexpected error occurred during signup.");
  }
};

export const activateAccount = async (token: string): Promise<ActivationResponse> => {
  try {
    const response = await axiosInstance.get<ActivationResponse>(`/public/auth/activate?token=${token}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to activate account");
    }
    throw new Error("An unexpected error occurred during account activation.");
  }
};
