import axios from 'axios';
import { setMsg } from './message';

import { 
  REGISTER_RADIO_BEGIN, REGISTER_RADIO_SUCCESS, REGISTER_RADIO_FAILURE, 
  SEARCH_RADIO_BEGIN, SEARCH_RADIO_SUCCESS, SEARCH_RADIO_FAILURE,
  ADD_RADIO_LIST, REMOVE_RADIO_LIST, UPDATE_RADIO_ACTUAL, 
  UPDATE_RADIO_STATE, START_RADIO, GET_REGISTERED_RADIOS_FAILURE, 
  GET_REGISTERED_RADIOS_SUCCESS, GET_REGISTERED_RADIOS_BEGIN
} from './actionTypes';

// show or hide radio search
export const start = () => {
  return {
    type: START_RADIO
  };
};

// update playing state
export const updateState = playbackState => {
  return {
    type: UPDATE_RADIO_STATE,
    payload: playbackState
  }
};

// update index of player radio
export const updateActual = actualIndex => {
  return {
    type: UPDATE_RADIO_ACTUAL,
    payload: actualIndex
  }
};

// add radio to playlist
export const addToPlaylist = radio => {
  return {
    type: ADD_RADIO_LIST,
    payload: radio
  };
};

// remove radio from playlist
export const removeFromPlaylist = radio => {
  return {
    type: REMOVE_RADIO_LIST,
    payload: radio
  };
};

// register radio
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

// search radios on server
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

// list my registered radios
export const getRegisteredRadios = () => {
  return dispatch => {
    try {
      dispatch(request());
      axios.get('/radio/registered')
        .then(res => {
          console.log(res.data)
          dispatch(success(res.data.radios));
        })
        .catch(err => {
          console.log(err)
          dispatch(failure(err));
          dispatch(setMsg('Erro ao searchar rádio. ' + err.error))
        });
    } catch (e) {
      console.log(e)
      dispatch(failure(e.message));
      dispatch(setMsg('Falha ao searchar rádio.'))
    }
  }

  function request(payload) { return { type: GET_REGISTERED_RADIOS_BEGIN, payload: payload } }
  function success(payload) { return { type: GET_REGISTERED_RADIOS_SUCCESS, payload: payload } }
  function failure(error) { return { type: GET_REGISTERED_RADIOS_FAILURE, payload: error } }
}