import { gql } from '@apollo/client';
import { client } from '../../graphql';
import { SIGNUP_CHANGE, SIGNUP_RESET } from './constants';

import { setAuth } from '../Auth/actions';

import { push } from 'connected-react-router';

export const signupChange = (data) => {
  return async (dispatch) => {
    console.log(data);

    dispatch({
      type: SIGNUP_CHANGE, payload: data
    })
  }
}

export const signup = () => {
  return async (dispatch, getState) => {
    const data = getState().signup.signupFormData;

    console.log(data);

    client.mutate({
      mutation: gql`
      mutation createUser($data: CreateUserInput!) {
        data: createUser(data:$data){
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
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password
        }
      }
    })
      .then(result => {
        console.log(result);
        const data = result.data.data

        console.log(data)
        dispatch(setAuth(data));
        dispatch(signupReset());
        dispatch(push('/'));
      });
  }
}

export const signupReset = () => {
  return async (dispatch) => {
    dispatch({
      type: SIGNUP_RESET
    })
  }
}