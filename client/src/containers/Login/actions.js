import { gql } from '@apollo/client';
import { client } from '../../graphql';
import { LOGIN_CHANGE, LOGIN_RESET } from './constants';

import { setAuth } from '../Auth/actions';

import { push } from 'connected-react-router';

export const loginChange = (data) => {
  return async (dispatch) => {
    console.log(data);

    dispatch({
      type: LOGIN_CHANGE, payload: data
    })
  }
}

export const login = () => {
  return async (dispatch, getState) => {
    const data = getState().login.loginFormData;

    console.log(data);

    client.query({
      query: gql`
      query login($email: String!, $password:String!) {
        data: login(email: $email, password: $password){
            token,
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
      }  
    `,
      variables: {
        email: data.email,
        password: data.password
      }
    })
      .then(result => {
        console.log(result);
        const data = result.data.data;

        dispatch(setAuth(data));
        dispatch(loginReset());

        dispatch(push('/'));
      });
  }
}

export const loginReset = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_RESET
    })
  }
}