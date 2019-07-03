import {
  CREATE_RADIO_BEGIN,
  CREATE_RADIO_SUCCESS,
  CREATE_RADIO_FAILURE,
  SEARCH_RADIO_BEGIN,
  SEARCH_RADIO_SUCCESS,
  SEARCH_RADIO_FAILURE,
  ADD_RADIO_LIST,
  REMOVE_RADIO_LIST,
  UPDATE_RADIO_STATE,
  UPDATE_RADIO_ACTUAL,
  START_RADIO,
  GET_REGISTERED_RADIOS_BEGIN,
  GET_REGISTERED_RADIOS_SUCCESS,
  GET_REGISTERED_RADIOS_FAILURE,
  UPDATE_RADIO_BEGIN,
  UPDATE_RADIO_SUCCESS,
  UPDATE_RADIO_FAILURE,
  REMOVE_RADIO_BEGIN,
  REMOVE_RADIO_SUCCESS,
  REMOVE_RADIO_FAILURE,
  CLEAR_RADIO_LIST,
  REORDER_RADIO_LIST
} from "../actions/actionTypes";

const initialState = {
  firstTime: true, // first time opening app
  loading: false, // loading something
  error: null, // error from server
  searchVisible: false, // if show search modal radio
  searched: [], // last search for radios
  playbackState: null, // state of player
  list: [], // user selected radios
  actual: null, // actual radio playing
  actualIndex: null, // actual index of playing radio based on list
  registered: [] // radios that user has registered
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_RADIO:
      return { ...state, firstTime: false };
    case CREATE_RADIO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_RADIO_SUCCESS:
      return {
        ...state,
        loading: false,
        registered: state.registered.concat(action.payload)
      };
    case CREATE_RADIO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_RADIO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_RADIO_SUCCESS:
      return {
        ...state,
        loading: false,
        registered: state.registered.map(radio => {
          if (radio.id === action.payload.id) {
            return action.payload;
          }
          return radio;
        })
      };
    case UPDATE_RADIO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case REMOVE_RADIO_BEGIN:
      return {
        ...state,
        loading: "Apagando Rádio",
        error: null
      };
    case REMOVE_RADIO_SUCCESS:
      return {
        ...state,
        loading: false,
        registered: state.registered.filter(id => {
          if (id !== action.payload.id) {
            return false;
          }
          return true;
        })
      };
    case REMOVE_RADIO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SEARCH_RADIO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
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
          return radio._id !== action.payload._id;
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
    case CLEAR_RADIO_LIST:
      return {
        ...state,
        registered: []
      };
    case REORDER_RADIO_LIST:
      // generate new radio list based on action.payload array order
      let list = [];
      let actualIndex = state.actualIndex;

      action.payload.forEach((order, i) => {
        // reorder actual playing radio?
        if (i != order && order == state.actualIndex) {
          actualIndex = i + "";
        }
        // new radio list
        list.push(state.list[order]);
      });

      return { ...state, list, actualIndex };
    default:
      return state;
  }
};

export default reducer;
