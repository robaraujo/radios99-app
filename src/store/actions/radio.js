import { RADIO_UPDATE_STATE, RADIO_UPDATE_INFO, RADIO_REGISTERED } from './actionTypes';
import { setMsg } from './message';

export const radioUpdateState = playbackState => {
  return {
    type: RADIO_UPDATE_STATE,
    payload: playbackState
  }
}

export const radioUpdateInfo = payload => {
  return {
    type: RADIO_UPDATE_INFO,
    payload: payload
  }
}

export const radioRegistered = payload => {
  return {
    type: RADIO_REGISTERED,
    payload: payload
  }
}