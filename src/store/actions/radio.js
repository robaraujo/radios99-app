import axios from 'axios';
import { setMsg } from './message';

import { 
  CREATE_RADIO_BEGIN, CREATE_RADIO_SUCCESS, CREATE_RADIO_FAILURE, 
  UPDATE_RADIO_BEGIN, UPDATE_RADIO_SUCCESS, UPDATE_RADIO_FAILURE, 
  SEARCH_RADIO_BEGIN, SEARCH_RADIO_SUCCESS, SEARCH_RADIO_FAILURE,
  ADD_RADIO_LIST, REMOVE_RADIO_LIST, UPDATE_RADIO_ACTUAL, 
  UPDATE_RADIO_STATE, START_RADIO, GET_REGISTERED_RADIOS_FAILURE, 
  GET_REGISTERED_RADIOS_SUCCESS, GET_REGISTERED_RADIOS_BEGIN,
  REMOVE_RADIO_BEGIN, REMOVE_RADIO_FAILURE, REMOVE_RADIO_SUCCESS
} from './actionTypes';

/**
 * Show or hide radio search
 */
export const start = () => {
  return {
    type: START_RADIO
  };
};

/**
 * Update playing state
 * @param {string} playbackState 
 */
export const updateState = playbackState => {
  return {
    type: UPDATE_RADIO_STATE,
    payload: playbackState
  }
};

/**
 * Update index of player radio
 * @param {int} actualIndex 
 */
export const updateActual = actualIndex => {
  return {
    type: UPDATE_RADIO_ACTUAL,
    payload: actualIndex
  }
};

/**
 * add radio to playlist
 * @param {Radio} radio 
 */
export const addToPlaylist = radio => {
  return {
    type: ADD_RADIO_LIST,
    payload: radio
  };
};

/**
 * Remove radio from playlist
 * @param {Radio} radio 
 */
export const removeFromPlaylist = radio => {
  return {
    type: REMOVE_RADIO_LIST,
    payload: radio
  };
};

/**
 * Create radio
 * @param {Radio} radio 
 */
export const create = radio => {
  return dispatch => {
    try {
      console.log('request', radio);
      dispatch(request(radio));
      axios.post('/radio/create', radio)
        .then(res => {
          console.log('success', res);
          dispatch(success(res.data));
        })
        .catch(e => {
          dispatch(failure(e.response.data.error));
          dispatch(setMsg('Erro ao registrar rádio. ' + e.response.data.error))
        });
    } catch (e) {
      console.log('error 2', e);
      dispatch(failure(e.message));
      dispatch(setMsg('Falha ao registrar rádio.'))
    }
  }

  function request(payload) { return { type: CREATE_RADIO_BEGIN, payload: payload } }
  function success(payload) { return { type: CREATE_RADIO_SUCCESS, payload: payload } }
  function failure(error) { return { type: CREATE_RADIO_FAILURE, payload: error } }
}

/**
 * Update user radio
 * @param {Radio} radio 
 */
export const update = radio => {
  return dispatch => {
    try {
      dispatch(request(radio));
      axios.put('/radio/update', radio)
        .then(res => {
          console.log('success', res);
          dispatch(success(res.data));
        })
        .catch(e => {
          dispatch(failure(e.response.data.error));
          dispatch(setMsg(e.response.data.error))
        });
    } catch (e) {
      console.log('error 2', e);
      dispatch(failure(e.message));
      dispatch(setMsg('Falha ao registrar rádio.'))
    }
  }

  function request(payload) { return { type: UPDATE_RADIO_BEGIN, payload: payload } }
  function success(payload) { return { type: UPDATE_RADIO_SUCCESS, payload: payload } }
  function failure(error) { return { type: UPDATE_RADIO_FAILURE, payload: error } }
}

/**
 * Remove user radio
 * @param {int} id 
 */
export const remove = id => {
  return dispatch => {
    try {
      console.log('remove', id)
      dispatch(request(id));
      axios.delete('/radio/'+id)
        .then(res => {
          console.log('success', res);
          dispatch(success(res.data));
        })
        .catch(e => {
          console.log('error 1', e)
          dispatch(failure(e.response.data.error));
          dispatch(setMsg(e.response.data.error))
        });
    } catch (e) {
      console.log('error 2', e);
      dispatch(failure(e.message));
      dispatch(setMsg('Falha ao remover rádio.'))
    }
  }

  function request(payload) { return { type: REMOVE_RADIO_BEGIN, payload: payload } }
  function success(payload) { return { type: REMOVE_RADIO_SUCCESS, payload: payload } }
  function failure(error) { return { type: REMOVE_RADIO_FAILURE, payload: error } }
}

/**
 * Search radios on server
 * @param {string} word 
 */
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

/**
 * List my registered radios
 */
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