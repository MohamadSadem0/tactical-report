"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addItem, updateItem } from "@/redux/itemsSlice";

type ItemFormProps = {
  existingItem?: { id: number; name: string; description: string; price: number } | null;
  onSubmitSuccess?: () => void;
};

const ItemForm = ({ existingItem, onSubmitSuccess }: ItemFormProps) => {
  const [name, setName] = useState(existingItem?.name || "");
  const [description, setDescription] = useState(existingItem?.description || "");
  const [price, setPrice] = useState(existingItem?.price || 0);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (existingItem) {
      await dispatch(updateItem({ id: existingItem.id, updatedData: { name, description, price } }));
    } else {
      await dispatch(addItem({ name, description, price }));
    }

    setName("");
    setDescription("");
    setPrice(0);
    if (onSubmitSuccess) onSubmitSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">
        {existingItem ? "Edit Item" : "Add New Item"}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Price</label>
        <input
          type="number"
          placeholder="Item Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {existingItem ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
};

export default ItemForm;
