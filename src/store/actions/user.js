import axios from 'axios';
import { AUTH_USER_BEGIN, AUTH_USER_SUCCESS, AUTH_USER_FAILURE, USERS_LOGOUT } from './actionTypes';
import { setMsg } from './message';

export const logout = () => {
  return {
    type: USERS_LOGOUT
  }
}

export const authenticate = user => {
  return dispatch => {
    try {
      console.log(user)
      dispatch(request(user));
      axios.post('/auth/authenticate', user)
        .then(res => {
          console.log(res)
          dispatch(success(res.data));
        })
        .catch(e => {
          console.log(e)
          console.log('teste1', e)
          dispatch(failure(e));
          dispatch(setMsg('Senha inválida. ' + e.error))
        });
    } catch (e) {
      console.log('teste2', e)
      dispatch(failure(e.message));
      dispatch(setMsg('Falha login'))
    }
  }

  function request(user) { return { type: AUTH_USER_BEGIN, payload: user } }
  function success(user) { return { type: AUTH_USER_SUCCESS, payload: user } }
  function failure(error) { return { type: AUTH_USER_FAILURE, payload: error } }
}