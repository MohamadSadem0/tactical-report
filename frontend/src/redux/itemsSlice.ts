import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchItemsAPI,
  addItemAPI,
  updateItemAPI,
  deleteItemAPI,
  Item,
} from "@/services/itemService";

type ItemsState = {
  items: Item[];
  loading: boolean;
  error: string | null;
};

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await fetchItemsAPI();
  return response.items;
});

export const addItem = createAsyncThunk(
  "items/addItem",
  async (newItem: { name: string; description: string; price: number }) => {
    return await addItemAPI(newItem);
  }
);

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ id, updatedData }: { id: number; updatedData: Partial<Item> }) => {
    return await updateItemAPI(id, updatedData);
  }
);

export const deleteItem = createAsyncThunk("items/deleteItem", async (id: number) => {
  return await deleteItemAPI(id);
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch items";
      })
      .addCase(addItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action: PayloadAction<Item>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default itemsSlice.reducer;
