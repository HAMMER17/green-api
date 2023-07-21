import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserData: (state, action) => {
      state.value = action.payload
    }
  }
})
export const { getUserData } = userSlice.actions
export default userSlice.reducer