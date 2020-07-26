import {
  TOGGLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_CART,
  HANDLE_CART_TOTAL,
  INC_PRODUCT_QUANTITY,
  DEC_PRODUCT_QUANTITY
} from './constants';

export const toggleCart = () => {
  return async (dispatch) => {

    dispatch({
      type: TOGGLE_CART
    })
  }
}

export const fetchCart = () => {
  return async (dispatch) => {

    const cartItems = [{
      id: "c1",
      product: {
        id: "p1",
        name: "One Plus 8",
        category: "mobiles",
        price: "35000",
        description: "This is the description of the oneplus mobile."
      },
      quantity: 1,
      status: "init",
    }]

    dispatch({
      type: FETCH_CART,
      payload: cartItems
    })

    dispatch(handleCartTotal())
  }
}

export const addToCart = (product) => {
  return async (dispatch, getState) => {

    // @ API req
    const cartItem = {
      id: `c${getState().cart.cartItems.length + 1}`,
      product: product,
      quantity: 1,
    };
    console.log(cartItem)
    dispatch({
      type: ADD_TO_CART,
      payload: cartItem
    })

    dispatch(handleCartTotal())
  }
}

export const incrementProductQuantity = (cartItem) => {
  return async (dispatch) => {

    dispatch({
      type: INC_PRODUCT_QUANTITY,
      payload: cartItem.product
    })

    dispatch(handleCartTotal())
  }
}

export const decrementProductQuantity = (cartItem) => {
  return async (dispatch) => {

    if (cartItem.quantity <= 1)
      dispatch(removeFromCart(cartItem.product));
    else
      dispatch({
        type: DEC_PRODUCT_QUANTITY,
        payload: cartItem.product
      })

    dispatch(handleCartTotal())
  }
}

export const removeFromCart = (product) => {
  return async (dispatch) => {

    dispatch({
      type: REMOVE_FROM_CART,
      payload: product
    })

    dispatch(handleCartTotal())
  }
}

export const handleCartTotal = () => {
  return async (dispatch, getState) => {

    const cartItems = getState().cart.cartItems;
    console.log(cartItems)
    let total = 0;

    cartItems.forEach(item => {
      total += item.product.price * item.quantity
    });

    dispatch({
      type: HANDLE_CART_TOTAL,
      payload: total
    })
  }
}