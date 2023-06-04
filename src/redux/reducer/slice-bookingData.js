import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const sliceBookingData = createSlice({
  name: "bookingdata",
  initialState: {
    detailhotel: {},
    checkin: "",
    checkout: "",
    adults: 0,
    children: 0,
    room: 0,
    numDays: null,
    totalBooking: null,
  },
  reducers: {
    addDetailHotel: (state, action) => {
      state.detailhotel = action.payload;
      state.totalBooking = action.payload.number_of_rooms;
    },
    addBookingDate: (state, action) => {
      const startDate = action.payload.startDate;
      const endDate = action.payload.endDate;
      if (startDate && endDate) {
        const difftime = Math.abs(endDate - startDate);
        const diffdays = Math.ceil(difftime / (1000 * 60 * 60 * 24));
        state.numDays = diffdays;
        state.checkin = moment(startDate).format("LL");
        state.checkout = moment(endDate).format("LL");
        if (state.totalBooking !== null) {
          const total = state.totalBooking * state.numDays;
          state.totalBooking = total;
        }
      }
    },
    handleAdd: (state, action) => {
      if (action.payload.type === "adults") {
        state.adults++;
      }
      if (action.payload.type === "children") {
        state.children++;
      }
      if (action.payload.type === "room") {
        state.room++;
      }
    },
    handleDelete: (state, action) => {
      if (action.payload.type === "adults") {
        state.adults--;
      }
      if (action.payload.type === "children") {
        state.children--;
      }
      if (action.payload.type === "room") {
        state.room--;
      }
    },
    clearBooking: (state) => {
      state.detailhotel = {};
      state.checkin = "";
      state.checkout = "";
      state.adults = 0;
      state.children = 0;
      state.room = 0;
      state.numDays = null;
      state.totalBooking = null;
    },
  },
});

export const {
  addDetailHotel,
  addBookingDate,
  handleAdd,
  handleDelete,
  clearBooking,
} = sliceBookingData.actions;
export default sliceBookingData.reducer;
