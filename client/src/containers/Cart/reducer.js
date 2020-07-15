import { TOGGLE_CART } from './constants';

const initialState = {
  isCartOpen: false,
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      }
    default: return state;
  }
}

export default cartReducer;