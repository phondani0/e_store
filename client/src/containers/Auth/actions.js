import { SET_AUTH, RESET_AUTH } from './constants';

export const setAuth = (user) => {
  return async (dispatch) => {
    dispatch({
      type: SET_AUTH,
      payload: user
    })
  }
}

export const resetAuth = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_AUTH
    })
  }
}