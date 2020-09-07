import { gql } from '@apollo/client';
import { client } from '../../graphql';

import {
} from './constants';


export const handleCheckout = () => {

}

export const createOrder = () => {
  return async (dispatch) => {

    client.mutate({
      mutation: gql`
        createOrder($data: createOrderInput) {
          createOrder(data: $data) {
            id
            customer_name
            customer_email
            cart {
              id,
              products
            }
            user {
              id 
              first_name
              email
            }
            updated_at
            created_at
          }
        }
      `,
      variables: {
        data: {
          customer_name: 'A',
          customer_email: "e",
          cart_id: 12121,
          user_id: 244
        }
      }
    }).then((data) => {
      console.log(data)
    })

    dispatch({
      type: ''
    })
  }
}