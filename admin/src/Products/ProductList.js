import React from 'react';
import { List, Datagrid, TextField, NumberField, DateField, ImageField } from 'react-admin';

function CustomDateField(props) {
  const newRecord = {
    [props.source]: parseInt(props.record[props.source])
  }
  return <DateField showTime {...props} record={newRecord} />
}


export const ProductList = props => {
  // console.log(props)
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <TextField source="category" />
        <NumberField source="quantity" />
        <NumberField source="price" />
        <ImageField source="image" title="image" />
        <CustomDateField source="created_at" />
        <CustomDateField source="updated_at" />
      </Datagrid>
    </List >
  );
}
