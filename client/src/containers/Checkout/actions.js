import { gql } from '@apollo/client';
import { client } from '../../graphql';

import {
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
        console.log(data)
      })
      .catch(err => {
        console.log(err);
      })

    dispatch({
      type: ''
    })
  }
}