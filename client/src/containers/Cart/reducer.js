import {
  TOGGLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_CART,
  HANDLE_CART_TOTAL,
  INC_PRODUCT_QUANTITY,
  DEC_PRODUCT_QUANTITY,
  CART_LOADING,
  CLEAR_CART,
} from './constants';

const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
  isLoading: false
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
        cartItems: action.payload || []
      }

    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }

    case INC_PRODUCT_QUANTITY:
      return (() => {

        let items = state.cartItems.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        });

        return {
          ...state,
          cartItems: items
        }
      })();

    case DEC_PRODUCT_QUANTITY:
      return (() => {

        let items = state.cartItems.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        });

        return {
          ...state,
          cartItems: items
        }
      })();

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
    case CART_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case CLEAR_CART:
      return initialState
    default: return state;
  }
}

export default cartReducer;