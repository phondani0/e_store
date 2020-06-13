import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';

const validateProductCreation = (values) => {
  console.log(values)
  const errors = {};
  if (!values.name) {
    errors.name = ['The name is required'];
  }
  if (!values.description) {
    errors.description = ['The description is required'];
  }
  if (!values.quantity) {
    errors.quantity = ['The quantity is required']
  } else if (values.quantity <= 0) {
    errors.quantity = ['The quantity should be greater than 0'];
  }

  if (!values.price) {
    errors.price = ['The price is required']
  } else if (values.price <= 0) {
    errors.price = ['The price should be greater than 0'];
  }

  return errors
};

export const ProductCreate = (props) => (
  <Create title="Create a Product" {...props}>
    <SimpleForm validate={validateProductCreation}>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="category" />
      <NumberInput source="quantity" />
      <NumberInput source="price" />
    </SimpleForm>
  </Create>
);