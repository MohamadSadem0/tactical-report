"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchItems, addItem, updateItem, deleteItem } from "@/redux/itemsSlice";

const ItemsCRUD = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.items);

  const [newItem, setNewItem] = useState({ name: "", description: "", price: 0 });

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAddItem = () => {
    if (newItem.name && newItem.description && newItem.price > 0) {
      dispatch(addItem(newItem));
      setNewItem({ name: "", description: "", price: 0 });
    }
  };

  const handleUpdateItem = (id: number, updatedData: { name: string; description: string; price: number }) => {
    dispatch(updateItem({ id, updatedData }));
  };

  const handleDeleteItem = (id: number) => {
    dispatch(deleteItem(id));
  };

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Add New Item</h2>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="block w-full p-2 border rounded my-2"
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="block w-full p-2 border rounded my-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
          className="block w-full p-2 border rounded my-2"
        />
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold">Items</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id} className="border p-4 rounded my-2">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <button
                onClick={() => handleUpdateItem(item.id!, { name: "Updated Name", description: "Updated Description", price: 50.0 })}
                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteItem(item.id!)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemsCRUD;
