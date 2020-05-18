import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <EmailField source="email" />
      <TextField source="mobile" />
      <TextField source="created_at" />
      <TextField source="updated_at" />
    </Datagrid>
  </List>
);
