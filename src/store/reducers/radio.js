import {
  REGISTER_RADIO_BEGIN, REGISTER_RADIO_SUCCESS, REGISTER_RADIO_FAILURE,
  SEARCH_RADIO_BEGIN, SEARCH_RADIO_SUCCESS, SEARCH_RADIO_FAILURE,
  TOGGLE_RADIO_SEARCH, ADD_RADIO_LIST, REMOVE_RADIO_LIST, UPDATE_RADIO_STATE, UPDATE_RADIO_ACTUAL
} from '../actions/actionTypes';

const initialState = {
  loading: false,       // loading something
  error: null,          // error from server
  searchVisible: false, // if show search modal radio
  searched: [],         // last search for radios
  playbackState: null,  // state of player
  list: [],             // user selected radios
  actual: null,         // actual radio playing
  actualIndex: null     // actual index of playing radio based on list 
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_RADIO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case REGISTER_RADIO_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case REGISTER_RADIO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SEARCH_RADIO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_RADIO_SUCCESS:
      return {
        ...state,
        loading: false,
        searched: action.payload
      };
    case SEARCH_RADIO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        searched: []
      };
    case TOGGLE_RADIO_SEARCH:
      return {
        ...state,
        searchVisible: action.payload,
        loading: false,
        error: null
      };
    case UPDATE_RADIO_STATE:
      return {
        ...state,
        playbackState: action.payload
      };
    case ADD_RADIO_LIST:
      return {
        ...state,
        list: state.list.concat(action.payload)
      };
    case REMOVE_RADIO_LIST:
      return {
        ...state,
        list: state.list.filter(radio => {
          return radio._id !== action.payload._id
        })
      };
    case UPDATE_RADIO_ACTUAL:
      console.log(state.list, action.payload)
      return {
        ...state,
        actualIndex: action.payload,
        actual: state.list[action.payload] ? state.list[action.payload] : null
      };
    default:
      return state
  }
}

export default reducer