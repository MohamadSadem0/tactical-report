"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchItems, deleteItem } from "@/redux/itemsSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ItemForm from "./forms/ItemForm";
import ItemCard from "./ItemCard";
import { getDecryptedData } from "@/utils/encryption";
import "@/app/globals.css";


const ItemsDashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { items, loading, error } = useSelector((state: RootState) => state.items);

  const role = getDecryptedData("UserRole");

  useEffect(() => {
    if (role !== "ADMIN") {
      router.push("/unauthorized");
    }
  }, [role, router]);

  const [activeTab, setActiveTab] = useState<"view" | "add">("view");

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteItem(id));
    dispatch(fetchItems()); 
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex space-x-4 border-b mb-6">
        <button
          className={`pb-2 px-4 ${
            activeTab === "view" ? "border-b-2 border-blue-500 font-bold" : "text-black"
          }`}
          onClick={() => setActiveTab("view")}
        >
          View All Items
        </button>
        <button
          className={`pb-2 px-4 ${
            activeTab === "add" ? "border-b-2 border-blue-500 font-bold" : "text-black"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add New Item
        </button>
      </div>

      {activeTab === "view" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : error ? (
            <p className="col-span-full text-center text-red-500">Error: {error}</p>
          ) : items.length > 0 ? (
            items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                role="ADMIN"
                onDelete={handleDelete} 
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No items available</p>
          )}
        </div>
      )}

      {activeTab === "add" && (
        <div>
          <ItemForm
            onSubmitSuccess={() => {
              setActiveTab("view");
              dispatch(fetchItems());
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ItemsDashboard;
