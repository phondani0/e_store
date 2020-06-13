import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

export const OrderEdit = (props) => (
  <Edit title="Edit Order" {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="customer_name" />
      <TextInput source="customer_email" />
      <TextInput source="product_id" />
      <TextInput disabled source="user_id" />
    </SimpleForm>
  </Edit>
);