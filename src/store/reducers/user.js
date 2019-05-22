import { AUTH_USER_BEGIN, AUTH_USER_SUCCESS, AUTH_USER_FAILURE, USERS_LOGOUT } from '../actions/actionTypes';

const initialState = {
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
        user: action.payload.user,
        token: action.payload.token,
      };
    case AUTH_USER_FAILURE:
      return {
        ...state,
        loggingIn: false,
        token: null,
        user: action.user,
      };
    case USERS_LOGOUT:
      console.log(initialState)
      return initialState;
    default:
      return state;
  }
}

export default reducer