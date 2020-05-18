import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

export const UserEdit = (props) => (
  <Edit title="Username" {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="first_name" />
      <TextInput source="last_name" options={{ multiLine: true }} />
      <TextInput multiline source="email" />
      <TextInput source="password" />
      <TextInput source="mobile" />
    </SimpleForm>
  </Edit>
);