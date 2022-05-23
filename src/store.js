import { configureStore } from '@reduxjs/toolkit'
import codeReducer from './components/reducers/codeReducers';
import runReducer from './components/reducers/runReducers'

export default configureStore({
  reducer: {
      code: codeReducer,
      run: runReducer,
  },
})