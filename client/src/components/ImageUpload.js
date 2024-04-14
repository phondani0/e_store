import React from "react";

import { gql } from "@apollo/client";
import { client } from "../graphql";

const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProduct($data: CreateProductInput!) {
        createProduct(data: $data) {
            id
            name
            image
            quantity
            category
            description
            price
            updated_at
            created_at
        }
    }
`;

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UpdateProduct($data: UpdateProductInput!) {
        updateProduct(data: $data) {
            id
            name
            image
            quantity
            category
            description
            price
            updated_at
            created_at
        }
    }
`;

const ImageUpload = () => {
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const randomId = Math.floor(1000 + Math.random() * 9000);
        const data = {
            name: ("iphone" + randomId).slice(0, 15),
            description: "desc",
            category: "smartphone",
            price: 20000,
            quantity: 10,
        };

        try {
            const reader = new FileReader();

            reader.onloadend = async () => {
                data.image = reader.result;

                const response = await client.mutate({
                    mutation: CREATE_PRODUCT_MUTATION,
                    // mutation: UPDATE_PRODUCT_MUTATION,
                    variables: { data },
                });

                console.log("Image uploaded successfully:", response);
            };

            reader.readAsDataURL(file);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return <input type="file" onChange={handleFileChange} />;
};

export default ImageUpload;
