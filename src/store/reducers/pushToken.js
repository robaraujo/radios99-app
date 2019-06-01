import { REGISTER_PUSH_TOKEN } from '../actions/actionTypes';

const initialState = {
  token: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_PUSH_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}

export default reducer