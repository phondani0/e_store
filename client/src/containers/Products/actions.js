import { gql } from '@apollo/client';
import { client } from '../../graphql';

import {
  FETCH_PRODUCTS,
  ADD_TO_CART_LOADING
} from './constants';

export const fetchProducts = () => {
  return async (dispatch) => {

    client.query({
      query: gql`
      query allProducts {
        allProducts {
          id
          name
          category
          price
          description
          image
        }
      }
    `
    })
      .then(result => {
        const data = result.data.allProducts.map((product) => {
          return {
            ...product,
            addToCartLoading: false
          }
        });

        dispatch({
          type: FETCH_PRODUCTS, payload: data
        })
      });
  }
}

export const addToCartLoading = (productId, value = false) => {
  return async (dispatch) => {

    console.log(productId, value);

    dispatch({
      type: ADD_TO_CART_LOADING, payload: {
        productId, value
      }
    })
  }
}