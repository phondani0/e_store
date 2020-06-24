import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput
} from 'react-admin';

export const OrderEdit = (props) => (
  <Edit title="Edit Order" {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="customer_name" />
      <TextInput source="customer_email" />
      <ReferenceInput label="Product" source="product.id" reference="Product">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput disabled label="product_id" source="product.id" />
      <TextInput disabled source="user.id" />
    </SimpleForm>
  </Edit >
);