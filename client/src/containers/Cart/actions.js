import { gql } from '@apollo/client';
import { client } from '../../graphql';

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
          type: "FETCH_CART",
          payload: data
        });

        dispatch(handleCartTotal())
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const addToCart = (product) => {
  return async (dispatch, getState) => {

    if (!getState().auth.isAuth) {

      const cartItem = {
        quantity: 1,
        product: product,
      }

      dispatch({
        type: ADD_TO_CART,
        payload: cartItem
      })
      dispatch(handleCartTotal())

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
      })
      .catch(error => {
        console.log(error);
      });

  }
}

export const incrementProductQuantity = (cartItem) => {
  return async (dispatch, getState) => {

    if (!getState().auth.isAuth) {

      dispatch({
        type: INC_PRODUCT_QUANTITY,
        payload: { ...cartItem, quantity: cartItem.quantity + 1 }
      });

      dispatch(handleCartTotal());
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
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export const decrementProductQuantity = (cartItem) => {
  return async (dispatch, getState) => {

    if (cartItem.quantity <= 1)
      return dispatch(removeFromCart(cartItem));

    if (!getState().auth.isAuth) {

      dispatch({
        type: DEC_PRODUCT_QUANTITY,
        payload: { ...cartItem, quantity: cartItem.quantity - 1 }
      });

      dispatch(handleCartTotal());
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
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export const removeFromCart = (cartItem) => {
  return async (dispatch, getState) => {

    if (!getState().auth.isAuth) {

      dispatch({
        type: REMOVE_FROM_CART,
        payload: cartItem
      })

      dispatch(handleCartTotal())
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
      })
      .catch(error => {
        console.log(error);
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