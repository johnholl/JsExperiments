import { configureStore } from '@reduxjs/toolkit'
import codeReducer from './components/reducers/codeReducers';
import runReducer from './components/reducers/runReducers'
import speedReducer from './components/reducers/speedReducers';
import consoleReducer from './components/reducers/consoleReducers';

export default configureStore({
  reducer: {
      code: codeReducer,
      run: runReducer,
      speed: speedReducer,
      console: consoleReducer,
  },
})