import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/userSlice';
import chatReducer from './chat/chatSlice';
import persistStore from 'redux-persist/es/persistStore';
import messageSlice from './message/messageSlice';
import socketSlice from './socket/socketSlice';
import onlineListingSlice from './onlineListing/onlineListingSlice';
import { apiSlice } from './api/apiSlice';

const rootReducer = combineReducers({
  user: userReducer, 
  chat: chatReducer, 
  message: messageSlice,
  socket: socketSlice,
  onlineListing: onlineListingSlice,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: ['chat', 'message', 'api', 'socket', 'onlineListing']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);