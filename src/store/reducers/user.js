import { AUTH_USER_BEGIN, AUTH_USER_SUCCESS, AUTH_USER_FAILURE } from '../actions/actionTypes';

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
    case AUTH_USER_BEGIN:
      return {
        ...state,
        loggingIn: true,
        user: action.payload
      };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case AUTH_USER_FAILURE:
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