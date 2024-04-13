import React from "react";
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    ImageField,
} from "react-admin";
import CustomDateField from "../components/date/CustomDateField";

export const ProductList = (props) => {
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
                <CustomDateField source="created_at" showTime />
                <CustomDateField source="updated_at" showTime />
            </Datagrid>
        </List>
    );
};
