import {
  REGISTER_RADIO_BEGIN, REGISTER_RADIO_SUCCESS, REGISTER_RADIO_FAILURE,
  SEARCH_RADIO_BEGIN, SEARCH_RADIO_SUCCESS, SEARCH_RADIO_FAILURE,
  ADD_RADIO_LIST, REMOVE_RADIO_LIST, UPDATE_RADIO_STATE,
  UPDATE_RADIO_ACTUAL, START_RADIO, GET_REGISTERED_RADIOS_BEGIN, GET_REGISTERED_RADIOS_SUCCESS, GET_REGISTERED_RADIOS_FAILURE
} from '../actions/actionTypes';

const initialState = {
  firstScreen: '',       // first screen to open
  loading: false,       // loading something
  error: null,          // error from server
  searchVisible: false, // if show search modal radio
  searched: [],         // last search for radios
  playbackState: null,  // state of player
  list: [],             // user selected radios
  actual: null,         // actual radio playing
  actualIndex: null,    // actual index of playing radio based on list 
  registered: []        // radios that user has registered
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_RADIO:
      state.firstScreen = 'PlaylistRegister';
      if (state.list.length) {
        state.firstScreen = 'Radio';

        if (!state.actual) {
          state.actualIndex = 0;
          state.actual = state.list[0];
        }
      }
      return state;
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
    case UPDATE_RADIO_STATE:
      return {
        ...state,
        playbackState: action.payload
      };
    case ADD_RADIO_LIST:
      let newState = {
        ...state,
        list: state.list.concat(action.payload)
      };

      // if first radio add as actual
      if (newState.list.length === 1) {
        newState.actualIndex = 0;
        newState.actual = action.payload;
      }

      return newState;
    case REMOVE_RADIO_LIST:
      return {
        ...state,
        list: state.list.filter(radio => {
          return radio._id !== action.payload._id
        })
      };
    case UPDATE_RADIO_ACTUAL:
      return {
        ...state,
        actualIndex: action.payload,
        actual: state.list[action.payload] ? state.list[action.payload] : null
      };
    case GET_REGISTERED_RADIOS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_REGISTERED_RADIOS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        registered: action.payload
      };
    case GET_REGISTERED_RADIOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state
  }
}

export default reducer