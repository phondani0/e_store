import { gql } from '@apollo/client';
import { client } from '../../graphql';
import {
  CREATE_ORDER_PENDING,
  CREATE_ORDER_SUCCESS,
  VERIFY_ORDER_SUCCESS,
  SET_ACTIVE_STEP
} from './constants';

import { push } from 'connected-react-router';

export const setActiveStep = (step) => {
  return async (dispatch) => {
    dispatch({
      type: SET_ACTIVE_STEP,
      payload: step
    });
  }
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

    dispatch({
      type: CREATE_ORDER_PENDING
    });

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
          status
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

export const verifyOrder = (order_id, payment) => {
  return async (dispatch, getState) => {
    console.log(getState());

    const auth = getState().auth;

    if (!auth.isAuth) {
      dispatch(push('/login'));
      return;
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = payment;

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
          status
        }
      }
    `,
      variables: {
        data: {
          order_id,
          payment: {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
          }
        }
      }
    })
      .then((data) => {
        console.log(data);
        dispatch({
          type: VERIFY_ORDER_SUCCESS,
          payload: data.data.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}