import { SET_MESSAGE } from './actionTypes'

export const setMsg = message => {
  if (typeof message === 'string') {
    message = {
      title: 'Aviso',
      text: message
    }
  }
  return {
    type: SET_MESSAGE,
    payload: message
  }
}