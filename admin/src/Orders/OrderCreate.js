import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const validateOrderCreation = (values) => {
  console.log(values)
  const errors = {};
  if (!values.customer_name) {
    errors.customer_name = ['The customer_name is required'];
  }
  if (!values.customer_email) {
    errors.customer_email = ['The customer_email is required'];
  }
  if (!values.product_id) {
    errors.product_id = ['The product_id is required'];
  }
  if (!values.user_id) {
    errors.user_id = ['The user_id is required'];
  }

  return errors
};

export const OrderCreate = (props) => (
  <Create title="Create a Order" {...props}>
    <SimpleForm validate={validateOrderCreation}>
      <TextInput source="customer_name" />
      <TextInput source="customer_email" />
      <TextInput source="product_id" />
      <TextInput source="user_id" />
    </SimpleForm>
  </Create>
);