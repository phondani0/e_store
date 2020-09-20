import { SET_AUTH, RESET_AUTH } from './constants';

import { clearCart } from '../Cart/actions';

import { gql } from '@apollo/client';
import { client } from '../../graphql';

export const getAuth = () => {
  return async (dispatch) => {
    console.log('get_auth_called...')
    await client.query({
      query: gql`
        query user {
          user {
            id
            first_name
            last_name
            email
            mobile
            created_at
            updated_at
          }  
        }
      `
    })
      .then(result => {
        const user = result.data.user;
        console.log('get_auth');
        const token = localStorage.getItem('token') || '';

        dispatch({
          type: SET_AUTH,
          payload: {
            user,
            token
          }
        })
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export const setAuth = (data) => {
  return async (dispatch) => {

    localStorage.setItem('token', data.token);

    dispatch({
      type: SET_AUTH,
      payload: data
    })
  }
}

export const resetAuth = () => {
  return async (dispatch) => {
    console.log('reset auth');

    localStorage.removeItem('token');

    dispatch(clearCart())

    dispatch({
      type: RESET_AUTH
    })
  }
}