import axios from "@/utils/axiosInstance";

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
  username:string;  
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {

    const response = await axios.post<AuthResponse>("/auth/login", data);
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to log in");
  }
};

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>("/auth/signup", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to sign up");
  }
};
