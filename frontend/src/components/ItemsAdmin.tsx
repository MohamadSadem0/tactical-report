"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchItems, deleteItem } from "@/redux/itemsSlice";
import { useEffect, useState } from "react";
import ItemForm from "./forms/ItemForm";

const ItemsAdmin = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.items);

  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    name: string;
    description: string;
    price: number;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteItem(id));
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Admin: Manage Items</h1>

      <div className="mb-8">
        <ItemForm
          existingItem={selectedItem}
          onSubmitSuccess={() => setSelectedItem(null)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-black-600">{item.description}</p>
                <p className="text-blue-500 font-bold mt-2">Price: ${item.price.toFixed(2)}</p>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex-1"
                  onClick={() => setSelectedItem(item)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex-1"
                  onClick={() => handleDelete(item.id!)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-black">No items available</p>
        )}
      </div>
    </div>
  );
};

export default ItemsAdmin;
