import axiosInstance from "@/utils/axiosInstance";
import { getDecryptedData } from "@/utils/encryption";

export type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const getAuthToken = (): string | null => {
  return getDecryptedData("UserToken");
};

export const fetchItemsAPI = async (): Promise<{ items: Item[] }> => {
  try {
    const response = await axiosInstance.get<{ items: Item[] }>("/public/items");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items.");
  }
};

export const addItemAPI = async (newItem: { name: string; description: string; price: number }): Promise<Item> => {
  const token = getAuthToken();
  
  const response = await axiosInstance.post<Item>("/admin/items/create", newItem, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateItemAPI = async (id: number, updatedData: Partial<Item>): Promise<Item> => {
  const token = getAuthToken();
  const response = await axiosInstance.put<Item>(`/admin/items/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteItemAPI = async (id: number): Promise<number> => {
  const token = getAuthToken();
  await axiosInstance.delete(`/admin/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return id;
};
