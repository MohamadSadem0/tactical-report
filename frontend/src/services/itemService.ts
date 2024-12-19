import axios from "@/utils/axiosInstance";
import { getDecryptedData } from "@/utils/encryption";
import { log } from "node:console";

export type Item = {
  id?: number;
  name: string;
  description: string;
  price: number;
};

const getAuthToken = (): string | null => {
  return getDecryptedData("UserToken");
};

export const fetchItemsAPI = async (): Promise<Item[]> => {
  const response = await axios.get<Item[]>("/items");
  console.log(response);
  
  return response.data;
};

export const addItemAPI = async (newItem: { name: string; description: string; price: number }): Promise<Item> => {
  const token = getAuthToken();
  const response = await axios.post<Item>("/items", newItem, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateItemAPI = async (id: number, updatedData: Item): Promise<Item> => {
  const token = getAuthToken();
  const response = await axios.put<Item>(`/items/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteItemAPI = async (id: number): Promise<number> => {
  const token = getAuthToken();
  await axios.delete(`/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return id;
};
