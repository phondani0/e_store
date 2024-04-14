import {
  FETCH_PRODUCTS,
  ADD_TO_CART_LOADING
} from './constants';

const initialState = {
  products: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case ADD_TO_CART_LOADING:
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.productId) {
            console.log({ ...product, addToCartLoading: action.payload.value })
            return { ...product, addToCartLoading: action.payload.value }
          }
          else return product;
        })
      }
    default:
      return state;
  }
};

export default productsReducer;
