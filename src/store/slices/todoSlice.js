import { createSlice } from "@reduxjs/toolkit";

const state = {
  tasks: [],
  taskSelected: null,
  isOpen: false,
};

const todo = createSlice({
  name: "todos",
  initialState: state,
  reducers: {
    getTasks: (state, action) => {
      state.tasks = [];
      action.payload.map((el) => state.tasks.push(el));
    },
    getTask: (state, action) => {
      const index = state.tasks.findIndex((el) => el.id === action.payload.id);
      if (index >= 0) {
        state.taskSelected = state.tasks[index];
        state.isOpen = action.payload.isOpen;
      }
    },
  },
});

const { reducer, actions } = todo;
export const { getTasks, getTask } = actions;
export default reducer;
