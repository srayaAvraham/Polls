import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import pollsReducer from '../features/polls/pollsListSlice';
import usersReducer from '../features/users/usersSlice'
import { persistStore, persistReducer,  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux"; 

const reducers = combineReducers({
  polls: pollsReducer,
  users: usersReducer          
 });

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)
export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});
