import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  phone: null,
}

export const dataUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.value = action.payload
    },
    getNumber: (state, action) => {
      state.phone = action.payload
    }
  }
})
export const { getUser, getNumber } = dataUser.actions
export default dataUser.reducer