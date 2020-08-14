import { SET_AUTH, RESET_AUTH } from './constants';

export const setAuth = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SET_AUTH,
      payload: data
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