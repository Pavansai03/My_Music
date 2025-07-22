import { configureStore } from '@reduxjs/toolkit'
import featureReducer from './features/featureSlice'

export default configureStore({
  reducer: {
     music: featureReducer,
  },
})