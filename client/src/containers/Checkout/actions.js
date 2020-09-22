import { gql } from '@apollo/client';
import { client } from '../../graphql';
import {
  CREATE_ORDER_SUCCESS
} from './constants';

import { push } from 'connected-react-router';

export const handleCheckout = () => {

}

export const createOrder = () => {
  return async (dispatch, getState) => {
    console.log(getState());

    const auth = getState().auth;

    if (!auth.isAuth) {
      dispatch(push('/login'));
      return;
    }

    const user_id = auth.user.id;

    client.mutate({
      mutation: gql`
      mutation createOrder($data: createOrderInput) {
        data: createOrder(data: $data){
          id
          customer_name
          customer_email
          cart {
            id
            product {
              name
              description
            }
            quantity
          }
          user {
            id
          }
          payment {
            id
            key_id
            amount
            currency
          }
        }
      }   
    `,
      variables: {
        data: {
          user_id: user_id,
          customer_name: "AP",
          customer_email: "ap@gmail.com"
        }
      }
    })
      .then((data) => {
        console.log(data);
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: data.data.data
        })
      })
      .catch(err => {
        console.log(err);
      })


  }
}

export const verifyOrder = (order) => {
  return async (dispatch, getState) => {
    console.log(getState());

    const auth = getState().auth;

    if (!auth.isAuth) {
      dispatch(push('/login'));
      return;
    }

    const user_id = auth.user.id;

    const {
      id: order_id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = order;

    client.mutate({
      mutation: gql`
      mutation verifyOrder($data: VerifyOrderInput) {
        data: verifyOrder(data: $data){
          id
          customer_name
          customer_email
          cart {
            id
            product {
              name
              description
            }
            quantity
          }
          user {
            id
          }
          status
        }
      }
    `,
      variables: {
        data: {
          order_id,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        }
      }
    })
      .then((data) => {
        console.log(data);
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: data.data.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}