import React from 'react';
import { List, Datagrid, TextField, DateField, ReferenceField } from 'react-admin';

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
        {/* <TextField label="product" source="product.name" /> */}
        <ReferenceField label="Product" source="product.id" reference="Product" sortBy="product.name">
          <TextField source="name" />
        </ReferenceField>
        {/* <TextField label="user" source="user.first_name" /> */}
        <ReferenceField label="User" source="user.id" reference="User" sortBy="user.first_name">
          <TextField source="first_name" />
        </ReferenceField>
        <CustomDateField source="created_at" />
        <CustomDateField source="updated_at" />
      </Datagrid>
    </List >
  );
}