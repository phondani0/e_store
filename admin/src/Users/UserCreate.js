import React from 'react';
import { Create, SimpleForm, TextInput, PasswordInput } from 'react-admin';

const validateUserCreation = (values) => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = ['The firstName is required'];
  }
  if (!values.last_name) {
    errors.last_name = ['The lastname is required'];
  }
  if (!values.email) {
    errors.email = ['The email is required'];
  }

  if (!values.mobile) {
    errors.mobile = ['The mobile is required']
  } else if (!values.mobile.trim().length === 10) {
    errors.mobile = ['The mobile should be of length 10']
  }

  if (!values.password) {
    errors.password = ['The password is required']
  }

  if (!values.confirm_password) {
    errors.confirm_password = ['The confirm_password is required']
  }

  if (values.password !== values.confirm_password) {
    errors.confirm_password = ['Password and confirm password should be same']
  }

  return errors
};

export const UserCreate = (props) => (
  <Create title="Create a User" {...props}>
    <SimpleForm validate={validateUserCreation}>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput multiline source="email" />
      <TextInput source="mobile" />
      <PasswordInput source="password" />
      <PasswordInput source="confirm_password" />
    </SimpleForm>
  </Create>
);