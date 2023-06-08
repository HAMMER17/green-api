import { configureStore } from '@reduxjs/toolkit'
import dataUser from './dataUser'

export const store = configureStore({
  reducer: {
    user: dataUser,
  },
})