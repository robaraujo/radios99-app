import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import radioReducer from './reducers/radio';
import messageReducer from './reducers/message'

const reducers = combineReducers({
  user: userReducer,
  radio: radioReducer,
  message: messageReducer
});

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)))
};

export default storeConfig;