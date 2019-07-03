import axios from "axios";
import { REGISTER_PUSH_TOKEN } from "./actionTypes";

export const registerPushToken = token => {
  return dispatch => {
    try {
      axios
        .post("/push/registerToken", { token })
        .then(res => {
          dispatch({
            type: REGISTER_PUSH_TOKEN,
            payload: token
          });
        })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
};
