import { userConstants } from '../actions/actionTypes'
import { AsyncStorage } from 'react-native';

const initialState = {
  loggedIn: false,
  loggingIn: false,
  token: null,
  user: {
    email: '',
    password: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.AUTH_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.payload
      };
    case userConstants.AUTH_SUCCESS:
      // save cache
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
      AsyncStorage.setItem('token', action.payload.token);
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case userConstants.AUTH_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        user: action.user,
      };
    default:
      return state
  }
}

export default reducer