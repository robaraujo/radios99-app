import axios from 'axios';
import { REGISTER_PUSH_TOKEN } from './actionTypes';




export const registerPushToken = token => {
  return dispatch => {
    try {
      console.log('registering push token', token)
      axios.post('/push/registerToken', { token })
        .then(res => {
          console.log('registered push token', res)
          dispatch({
            type: REGISTER_PUSH_TOKEN,
            payload: token
          });
        })
        .catch(e => {
          console.log(e)
        });
    } catch (e) {
      console.log(e)
    }
  }
}