"use client";

import { useState } from "react";
import ItemModal from "./modals/ItemModal";
import "@/app/globals.css";

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type ItemCardProps = {
  item: Item;
  role: "ADMIN" | "USER"; 
  onDelete?: (id: number) => void;
};

const ItemCard = ({ item, role, onDelete }: ItemCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      if (confirm("Are you sure you want to delete this item?")) {
        onDelete(item.id);
      }
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-black">{item.description}</p>
        <p className="text-blue-500 font-bold mt-2">Price: ${item.price.toFixed(2)}</p>
      </div>

      <div className="mt-4 flex space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex-1"
          onClick={() => setIsModalOpen(true)}
        >
          View Details
        </button>

        {role === "ADMIN" && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex-1"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>

      {isModalOpen && (
        <ItemModal
          item={item}
          onClose={() => setIsModalOpen(false)}
          onItemUpdated={() => {}}
        />
      )}
    </div>
  );
};

export default ItemCard;
