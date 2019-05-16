import axios from 'axios';
import { setMsg } from './message';

import { 
  REGISTER_RADIO_BEGIN, REGISTER_RADIO_SUCCESS, REGISTER_RADIO_FAILURE, 
  SEARCH_RADIO_BEGIN, SEARCH_RADIO_SUCCESS, SEARCH_RADIO_FAILURE 
} from './actionTypes';

export const register = radio => {
  return dispatch => {
    try {
      dispatch(request(radio));
      axios.post('/radio/register', radio)
        .then(res => {
          dispatch(success(res.data));
        })
        .catch(err => {
          dispatch(failure(err));
          dispatch(setMsg('Erro ao registrar rádio. ' + err.error))
        });
    } catch (e) {
      dispatch(failure(e.message));
      dispatch(setMsg('Falha ao registrar rádio.'))
    }
  }

  function request(payload) { return { type: REGISTER_RADIO_BEGIN, payload: payload } }
  function success(payload) { return { type: REGISTER_RADIO_SUCCESS, payload: payload } }
  function failure(error) { return { type: REGISTER_RADIO_FAILURE, payload: error } }
}

export const search = word => {
  return dispatch => {
    try {
      dispatch(request(word));
      axios.get('/radio?search='+word)
        .then(res => {
          dispatch(success(res.data.radios));
        })
        .catch(err => {
          dispatch(failure(err));
          dispatch(setMsg('Erro ao searchar rádio. ' + err.error))
        });
    } catch (e) {
      dispatch(failure(e.message));
      dispatch(setMsg('Falha ao searchar rádio.'))
    }
  }

  function request(payload) { return { type: SEARCH_RADIO_BEGIN, payload: payload } }
  function success(payload) { return { type: SEARCH_RADIO_SUCCESS, payload: payload } }
  function failure(error) { return { type: SEARCH_RADIO_FAILURE, payload: error } }
}