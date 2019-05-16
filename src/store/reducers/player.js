import { UPDATE_PLAYER_STATE, UPDATE_PLAYER_INFO } from '../actions/actionTypes'

const initialState = {
  playbackState: null,
  infos: {
    artist: '',
    artwork: '',
    title: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYER_STATE:
      return {
        ...state,
        playbackState: action.payload
      };
    case UPDATE_PLAYER_INFO:
      return {
        ...state,
        infos: {
          ...state.infos,
          ...action.payload
        }
      };
    default:
      return state
  }
}

export default reducer