import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
  timeout: 5000, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const encryptedToken = sessionStorage.getItem("authToken");
    if (encryptedToken) {
      const decryptedToken = decryptData(encryptedToken);
      config.headers["Authorization"] = `Bearer ${decryptedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - Redirecting to login");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
