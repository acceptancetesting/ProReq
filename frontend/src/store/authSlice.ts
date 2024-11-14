import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userName?: string;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  userName: localStorage.getItem("userName") || undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; userName: string }>) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.userName = action.payload.userName;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userName", action.payload.userName);
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.userName = undefined;
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
