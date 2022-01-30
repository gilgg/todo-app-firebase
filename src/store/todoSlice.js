import { createSlice } from "@reduxjs/toolkit";

const initialTodoState = {
  userId: "",
  todos: [],
  darkMode: false,
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: initialTodoState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setTodos(state, action) {
      state.todos = action.payload;
    },
    clearDarkMode(state) {
      state.darkMode = false;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
