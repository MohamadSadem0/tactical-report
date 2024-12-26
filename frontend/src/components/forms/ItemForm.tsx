"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addItem, updateItem } from "@/redux/itemsSlice";

type Item = {
  id?: number;
  name: string;
  description: string;
  price: number;
};

type ItemFormProps = {
  existingItem?: Item | null;
  onSubmitSuccess?: () => void;
};

const ItemForm = ({ existingItem, onSubmitSuccess }: ItemFormProps) => {
  const [name, setName] = useState<string>(existingItem?.name || "");
  const [description, setDescription] = useState<string>(existingItem?.description || "");
  const [price, setPrice] = useState<number>(existingItem?.price || 0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (existingItem?.id) {
        await dispatch(
          updateItem({ id: existingItem.id, updatedData: {id: existingItem.id, name, description, price } })
        );
      } else {
        await dispatch(addItem({ name, description, price }));
      }

      setName("");
      setDescription("");
      setPrice(0);

      if (onSubmitSuccess) onSubmitSuccess();
    } finally {
      setIsSubmitting(false);
    }
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
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
          Price
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          placeholder="Item Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 text-white rounded transition ${
          isSubmitting ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isSubmitting
          ? existingItem
            ? "Updating..."
            : "Adding..."
          : existingItem
          ? "Update Item"
          : "Add Item"}
      </button>
    </form>
  );
};

export default ItemForm;
