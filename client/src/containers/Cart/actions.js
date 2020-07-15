
import { TOGGLE_CART } from './constants';

export const toggleDrawer = (event, value) => {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_CART
    })
  }
}

