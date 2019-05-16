import { REGISTER_RADIO_BEGIN, REGISTER_RADIO_SUCCESS, REGISTER_RADIO_FAILURE, SEARCH_RADIO_BEGIN, SEARCH_RADIO_SUCCESS, SEARCH_RADIO_FAILURE } from '../actions/actionTypes'

const initialState = {
  loading: false,
  error: null,
  searched: [],
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
    default:
      return state
  }
}

export default reducer