import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    name: string;
    email: string;
    favoriteFilms: number[];
  } | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: { name: string; email: string; favoriteFilms: number[] };
      }>
    ) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    ToggleAddRemoveItemFromMyList: (state, action: PayloadAction<number>) => {
      const isAddedToMyList = state.user?.favoriteFilms.some(
        (id) => id === action.payload
      );
      if (isAddedToMyList) {
        if (state.user) {
          state.user.favoriteFilms = state.user.favoriteFilms.filter(
            (id) => id !== action.payload
          );
        }
      } else {
        state.user?.favoriteFilms.push(action.payload);
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
