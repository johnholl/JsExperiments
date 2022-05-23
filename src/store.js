import { configureStore } from '@reduxjs/toolkit'
import codeReducer from './components/reducers/codeReducers';

export default configureStore({
  reducer: {
      code: codeReducer,
  },
})