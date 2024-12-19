"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchItems, deleteItem } from "@/redux/itemsSlice";
import { useEffect, useState } from "react";
import ItemForm from "./forms/ItemForm";

const ItemsList = () => {
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
    dispatch(deleteItem(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1>Items</h1>

      <ItemForm
        existingItem={selectedItem}
        onSubmitSuccess={() => setSelectedItem(null)}
      />

      <ul>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className="border p-4 my-2 rounded">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price.toFixed(2)}</p>

              <button
                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setSelectedItem(item)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(item.id!)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No items available</p>
        )}
      </ul>
    </div>
  );
};

export default ItemsList;
