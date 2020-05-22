import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

export const UserEdit = (props) => (
  <Edit title="Edit User" {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput multiline source="email" />
      <TextInput source="mobile" />
    </SimpleForm>
  </Edit>
);