import { gql } from '@apollo/client';
import { client } from '../../graphql';

import {
  TOGGLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_CART,
  MERGE_CART,
  HANDLE_CART_TOTAL,
  INC_PRODUCT_QUANTITY,
  DEC_PRODUCT_QUANTITY,
  CART_LOADING,
  CLEAR_CART
} from './constants';

import { addToCartLoading } from '../Products/actions';

const sleep = (val) => new Promise(resolve => setTimeout(resolve, val));

export const toggleCart = () => {
  return async (dispatch) => {

    dispatch({
      type: TOGGLE_CART
    })
  }
}

export const fetchCart = () => {
  return async (dispatch) => {

    // const cartItems = [{
    //   id: "c1",
    //   product: {
    //     id: "p1",
    //     name: "One Plus 8",
    //     category: "mobiles",
    //     price: "35000",
    //     description: "This is the description of the oneplus mobile."
    //   },
    //   quantity: 1,
    //   status: "init",
    // }]

    dispatch(cartLoading(true));

    client.query({
      query: gql`
      query fetchCart {
        fetchCart {
          id
          quantity
          product {
            id
            name
            category
            price
            description
            image
          }
          status
        }
      }
    `
    })
      .then(result => {
        console.log(result);
        const data = result.data.fetchCart;

        dispatch({
          type: FETCH_CART,
          payload: data
        });

        dispatch(handleCartTotal())
        dispatch(cartLoading(false));

      })
      .catch(error => {
        dispatch(cartLoading(false));
        console.log(error);
      })
  }
}

export const addToCart = (product) => {
  return async (dispatch, getState) => {

    dispatch(addToCartLoading(product.id, true));
    dispatch(cartLoading(true));

    if (!getState().auth.isAuth) {
      const cartItem = {
        id: `${getState().cart.cartItems.length + 1 || 1}`,
        quantity: 1,
        product: product,
      }

      await sleep(800);

      dispatch({
        type: ADD_TO_CART,
        payload: cartItem
      })

      dispatch(handleCartTotal())
      dispatch(addToCartLoading(product.id, false));
      dispatch(cartLoading(false));

      return;
    }

    client.mutate({
      mutation: gql`
      mutation addToCart($productId:String! ,$quantity:Int!) {
        data: addToCart(productId: $productId, quantity: $quantity){
          id
          quantity
          product {
            id
            name
            category
            price
            description
            image
          }
          status
          }
      }
    `,
      variables: {
        productId: product.id,
        quantity: 1
      }
    })
      .then(result => {
        console.log(result);
        const cartItem = result.data.data;

        dispatch({
          type: ADD_TO_CART,
          payload: cartItem
        })

        dispatch(handleCartTotal())
        dispatch(addToCartLoading(product.id, false));
        dispatch(cartLoading(false));
      })
      .catch(error => {
        dispatch(addToCartLoading(product.id, false));
        dispatch(cartLoading(false));
        console.log(error);
      });

  }
}

export const incrementProductQuantity = (cartItem) => {
  return async (dispatch, getState) => {

    dispatch(addToCartLoading(cartItem.product.id, true));
    dispatch(cartLoading(true));

    if (!getState().auth.isAuth) {
      await sleep(800);

      dispatch({
        type: INC_PRODUCT_QUANTITY,
        payload: { ...cartItem, quantity: cartItem.quantity + 1 }
      });

      dispatch(handleCartTotal());
      dispatch(addToCartLoading(cartItem.product.id, false));
      dispatch(cartLoading(false));
      return;
    }

    client.mutate({
      mutation: gql`
        mutation editCart($cartId:String! ,$quantity:Int!) {
          data: editCart(cartId: $cartId, quantity: $quantity){
            id
            quantity
            product {
              id
              name
              category
              price
              description
              image
            }
            status
          }
        }
      `,
      variables: {
        cartId: cartItem.id,
        quantity: cartItem.quantity + 1
      }
    })
      .then(result => {
        console.log(result);
        const cartItem = result.data.data;

        dispatch({
          type: INC_PRODUCT_QUANTITY,
          payload: cartItem
        })

        dispatch(handleCartTotal())

        dispatch(addToCartLoading(cartItem.product.id, false));
        dispatch(cartLoading(false));

      })
      .catch(error => {
        console.log(error);
        dispatch(addToCartLoading(cartItem.product.id, false));
        dispatch(cartLoading(false));

      });
  }
}

export const decrementProductQuantity = (cartItem) => {
  return async (dispatch, getState) => {

    dispatch(addToCartLoading(cartItem.product.id, true));
    dispatch(cartLoading(true));

    if (cartItem.quantity <= 1)
      return dispatch(removeFromCart(cartItem));

    if (!getState().auth.isAuth) {
      await sleep(800);

      dispatch({
        type: DEC_PRODUCT_QUANTITY,
        payload: { ...cartItem, quantity: cartItem.quantity - 1 }
      });

      dispatch(handleCartTotal());
      dispatch(addToCartLoading(cartItem.product.id, false));
      dispatch(cartLoading(false));
      return;
    }

    client.mutate({
      mutation: gql`
        mutation editCart($cartId:String! ,$quantity:Int!) {
          data: editCart(cartId: $cartId, quantity: $quantity){
            id
            quantity
            product {
              id
              name
              category
              price
              description
              image
            }
            status
          }
        }
      `,
      variables: {
        cartId: cartItem.id,
        quantity: cartItem.quantity - 1
      }
    })
      .then(result => {
        console.log(result);
        const cartItem = result.data.data;

        dispatch({
          type: DEC_PRODUCT_QUANTITY,
          payload: cartItem
        })

        dispatch(handleCartTotal())
        dispatch(addToCartLoading(cartItem.product.id, false));
        dispatch(cartLoading(false));
      })
      .catch(error => {
        console.log(error);
        dispatch(addToCartLoading(cartItem.product.id, false));
        dispatch(cartLoading(false));
      });
  }
}

export const removeFromCart = (cartItem) => {
  return async (dispatch, getState) => {

    dispatch(addToCartLoading(cartItem.product.id, true));
    dispatch(cartLoading(true));

    if (!getState().auth.isAuth) {
      await sleep(800);

      dispatch({
        type: REMOVE_FROM_CART,
        payload: cartItem
      })

      dispatch(handleCartTotal())
      dispatch(addToCartLoading(cartItem.product.id, false));
      dispatch(cartLoading(false));
      return;
    }

    client.mutate({
      mutation: gql`
        mutation removeFromCart($cartId:String!) {
          data: removeFromCart(cartId: $cartId){
            id
          }
        }
      `,
      variables: {
        cartId: cartItem.id
      }
    })
      .then(result => {
        console.log(result);
        const item = result.data.data;

        dispatch({
          type: REMOVE_FROM_CART,
          payload: item
        })

        dispatch(handleCartTotal())
        dispatch(addToCartLoading(cartItem.product.id, false));
        dispatch(cartLoading(false));
      })
      .catch(error => {
        console.log(error);
        dispatch(addToCartLoading(cartItem.product.id, false));
        dispatch(cartLoading(false));
      });

    // dispatch({
    //   type: REMOVE_FROM_CART,
    //   payload: product
    // })

    // dispatch(handleCartTotal())
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

export const mergeCart = (items) => {
  return async (dispatch, getState) => {

    const cartItems = getState().cart.cartItems;

    // merge any new cart items but do not increase quantity

    dispatch({
      type: MERGE_CART,
      payload: cartItems
    })
  }
}

export const cartLoading = (value = false) => {
  return async (dispatch) => {
    dispatch({
      type: CART_LOADING,
      payload: value
    })
  }
}

export const clearCart = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_CART
    })
  }
}