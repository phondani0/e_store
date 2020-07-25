import {
  TOGGLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_CART,
  HANDLE_CART_TOTAL
} from './constants';

const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      }

    case FETCH_CART:
      return {
        ...state,
        cartItems: action.payload
      }

    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }

    case REMOVE_FROM_CART:
      return (() => {
        let items = state.cartItems.filter(item => item.id !== action.payload.id);

        return {
          ...state,
          cartItems: items
        }
      })();

    case HANDLE_CART_TOTAL:
      return {
        ...state,
        cartTotal: action.payload
      }
    default: return state;
  }
}

export default cartReducer;