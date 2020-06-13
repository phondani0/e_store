import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

const validateProductModification = (values) => {
  console.log(values)

  const errors = {};

  if (values.quantity && values.quantity <= 0) {
    errors.quantity = ['The quantity should be greater than 0'];
  }

  if (values.price && values.price <= 0) {
    errors.price = ['The price should be greater than 0'];
  }

  return errors
};

export const ProductEdit = (props) => (
  <Edit title="Edit Product" {...props}>
    <SimpleForm validate={validateProductModification}>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="category" />
      <NumberInput source="quantity" />
      <NumberInput source="price" />
    </SimpleForm>
  </Edit>
);