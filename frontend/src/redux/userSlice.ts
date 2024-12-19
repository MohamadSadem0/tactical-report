import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveEncryptedData, getDecryptedData } from "@/utils/encryption";

type UserState = {
  role: string | null;
  token: string | null;
  email: string | null; 
  username: string | null;
};

const initialState: UserState = {
  role: null,
  token: null,
  email: null,
  username: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; token: string; role: string; username: string }>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.username = action.payload.username;

      saveEncryptedData("UserEmail", action.payload.email);
      saveEncryptedData("UserToken", action.payload.token);
      saveEncryptedData("UserRole", action.payload.role);
      saveEncryptedData("Username", action.payload.username);
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
      state.role = null;
      state.username = null;

      sessionStorage.removeItem("EncryptedUserEmail");
      sessionStorage.removeItem("EncryptedUserToken");
      sessionStorage.removeItem("EncryptedUserRole");
      sessionStorage.removeItem("EncryptedUsername");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
