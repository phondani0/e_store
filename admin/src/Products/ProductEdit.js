import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const ProductEdit = (props) => (
  <Edit title="Edit Product" {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="category" />
      <NumberInput source="quantity" />
      <NumberInput source="price" />
    </SimpleForm>
  </Edit>
);