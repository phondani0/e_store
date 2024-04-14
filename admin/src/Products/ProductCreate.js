import React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";
import ImageUpload from "../components/image_upload/ImageUpload";
import { useFormContext } from "react-hook-form";

const validateProductCreation = (values) => {
    console.log(values);
    const errors = {};
    if (!values.name) {
        errors.name = ["The name is required"];
    }
    if (!values.description) {
        errors.description = ["The description is required"];
    }
    if (!values.quantity) {
        errors.quantity = ["The quantity is required"];
    } else if (values.quantity <= 0) {
        errors.quantity = ["The quantity should be greater than 0"];
    }

    if (!values.price) {
        errors.price = ["The price is required"];
    } else if (values.price <= 0) {
        errors.price = ["The price should be greater than 0"];
    }

    if (!values.image) {
        errors.image = ["The image is required"];
    }

    return errors;
};

const FormContent = (props) => {
    const { setValue } = useFormContext();

    const handleImageUpload = (imageUrls) => {
        setValue("image", imageUrls[0]);
    };

    return (
        <>
            <TextInput source="name" />
            <TextInput source="description" />
            <ImageUpload onChange={handleImageUpload} />
            <TextInput source="category" />
            <NumberInput source="quantity" />
            <NumberInput source="price" />
        </>
    );
};

export const ProductCreate = (props) => {
    return (
        <Create title="Create a Product" {...props}>
            <SimpleForm validate={validateProductCreation}>
                <FormContent />
            </SimpleForm>
        </Create>
    );
};
