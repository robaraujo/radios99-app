import { UPDATE_PLAYER_STATE, UPDATE_PLAYER_INFO } from './actionTypes';

export const updateState = playbackState => {
  return {
    type: UPDATE_PLAYER_STATE,
    payload: playbackState
  }
}

export const updateInfo = payload => {
  return {
    type: UPDATE_PLAYER_INFO,
    payload: payload
  }
}