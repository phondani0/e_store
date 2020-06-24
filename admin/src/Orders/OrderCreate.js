import React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';

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
      <ReferenceInput label="Product" source="product_id" reference="Product">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput disabled label="product_id" source="product_id" />
      <ReferenceInput label="User" source="user_id" reference="User">
        <SelectInput optionText="first_name" />
      </ReferenceInput>
      <TextInput disabled label="user_id" source="user_id" />
    </SimpleForm>
  </Create>
);