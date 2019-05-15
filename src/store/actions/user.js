import axios from 'axios';
import { userConstants } from './actionTypes'
import { setMsg } from './message';

export const logout = () => {
  return {
    type: USER_LOGGED_OUT
  }
}

export const authenticate = user => {
  return dispatch => {
    try {
      dispatch(request(user));
      axios.post('/auth/authenticate', user)
        .then(res => {
          dispatch(success(res.data));
        })
        .catch(err => {
          dispatch(failure(err));
          dispatch(setMsg('Falha login 1. ' + err.error))
        });
    } catch (e) {
      dispatch(failure(e.message));
      dispatch(setMsg('Falha login 2'))
    }
  }

  function request(user) { return { type: userConstants.AUTH_REQUEST, payload: user } }
  function success(user) { return { type: userConstants.AUTH_SUCCESS, payload: user } }
  function failure(error) { return { type: userConstants.AUTH_FAILURE, payload: error } }
}