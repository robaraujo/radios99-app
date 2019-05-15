import { RADIO_UPDATE_STATE, RADIO_UPDATE_INFO, RADIO_REGISTERED } from '../actions/actionTypes'

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
    case RADIO_UPDATE_STATE:
      return {
        ...state,
        playbackState: action.payload
      }
    case RADIO_UPDATE_INFO:
      return {
        ...state,
        infos: {
          ...state.infos,
          ...action.payload
        }
      };
    case RADIO_REGISTERED:
      return state;
    default:
      return state
  }
}

export default reducer