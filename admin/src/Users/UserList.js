import React from "react";
import { List, Datagrid, TextField, EmailField } from "react-admin";
import CustomDateField from "../components/date/CustomDateField";

export const UserList = (props) => {
    // console.log(props)
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="first_name" />
                <TextField source="last_name" />
                <EmailField source="email" />
                <TextField source="mobile" />

                <CustomDateField source="created_at" showTime />
                <CustomDateField source="updated_at" showTime />
            </Datagrid>
        </List>
    );
};
