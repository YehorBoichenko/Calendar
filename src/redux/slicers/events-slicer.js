import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  selectedDate: null,
};

const eventsSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    editEvent: (state, { payload }) => {
      state.events = state.events.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        } else {
          return item;
        }
      });
    },
    deleteEvent: (state, { payload }) => {
      state.events = state.events.filter((item) => item.id !== payload);
    },
    updateDate: (state, { payload }) => {
      state.selectedDate = payload;
    },
  },
});

export const { addEvent, editEvent, deleteEvent, updateDate } =
  eventsSlice.actions;

export default eventsSlice.reducer;
