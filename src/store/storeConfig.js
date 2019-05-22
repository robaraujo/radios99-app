import { createStore, compose, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import userReducer from './reducers/user';
import radioReducer from './reducers/radio';
import messageReducer from './reducers/message';

const reducers = {
  user: userReducer,
  radio: radioReducer,
  message: messageReducer
};

// Persistor Configuration to whitelist and blacklist any reducer
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['radio', 'user']
};
const persistedReducer = persistCombineReducers(persistConfig, reducers);

export default () => {
  const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
  const persistor = persistStore(store);
  return { store, persistor };
};