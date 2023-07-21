import { configureStore } from '@reduxjs/toolkit'
import getUser from './user'

export const store = configureStore({
  reducer: {
    user: getUser
  },
})