import React from 'react';
import { List, Datagrid, TextField, DateField } from 'react-admin';

function CustomDateField(props) {
  const newRecord = {
    [props.source]: parseInt(props.record[props.source])
  }
  return <DateField showTime {...props} record={newRecord} />
}


export const OrderList = props => {
  // console.log(props)
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="customer_name" />
        <TextField source="customer_email" />
        <TextField label="product_id" source="product_id" />
        <TextField label="user_id" source="user_id" />
        <CustomDateField source="created_at" />
        <CustomDateField source="updated_at" />
      </Datagrid>
    </List >
  );
}