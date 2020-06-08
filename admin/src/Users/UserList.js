import React from 'react';
import { List, Datagrid, TextField, EmailField, DateField } from 'react-admin';

function CustomDateField(props) {
  const newRecord = {
    [props.source]: parseInt(props.record[props.source])
  }
  return <DateField showTime {...props} record={newRecord} />
}


export const UserList = props => {
  // console.log(props)
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="first_name" />
        <TextField source="last_name" />
        <EmailField source="email" />
        <TextField source="mobile" />
        <CustomDateField source="created_at" />
        <CustomDateField source="updated_at" />
      </Datagrid>
    </List >
  );
}
