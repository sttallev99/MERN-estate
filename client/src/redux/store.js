import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/userSlice';
import chatReducer from './chat/chatSlice';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({user: userReducer, chat: chatReducer});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: ['chat']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export const persistor = persistStore(store);