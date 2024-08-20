import { gql } from "@apollo/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    method: "POST",
    prepareHeaders: (headers, { getState }) => {
        headers.set("Content-Type", "application/json");
        const jwtToken = localStorage.getItem("jwtToken");

        if (jwtToken) {
            headers.set("Authorization", `Bearer ${jwtToken}`);
        }
        return headers;
    },
});

export const cartApiSlice = createApi({
    reducerPath: "cartApi",
    baseQuery,
    endpoints: (builder) => ({
        fetchCart: builder.query({
            query: () => ({
                url: "/graphql",
                body: {
                    query: `
						query fetchCart {
							fetchCart {
								id
								quantity
								product {
									id
									name
									category
									price
									description
									image
								}
								status
							}
						}
					`,
                },
            }),
            transformResponse: (response) => {
                return response?.data?.fetchCart;
            },
        }),
        addToCart: builder.mutation({
            query: ({ productId, quantity }) => ({
                url: "graphql",
                body: {
                    query: `
                        mutation addToCart(
                            $productId: String!
                            $quantity: Int!
                        ) {
                            data: addToCart(
                                productId: $productId
                                quantity: $quantity
                            ) {
                                id
                                quantity
                                product {
                                    id
                                    name
                                    category
                                    price
                                    description
                                    image
                                }
                                status
                            }
                        }
                    `,
                    variables: { productId, quantity },
                },
            }),
        }),
        updateCart: builder.mutation({
            query: ({ cartId, quantity }) => ({
                url: "graphql",
                body: {
                    query: `
                        mutation editCart(
                            $cartId: String!
                            $quantity: Int!
                        ) {
                            data: editCart(
                                cartId: $cartId
                                quantity: $quantity
                            ) {
                                id
                                quantity
                                product {
                                    id
                                    name
                                    category
                                    price
                                    description
                                    image
                                }
                                status
                            }
                        }
                    `,
                    variables: { cartId, quantity },
                },
            }),
        }),
        removeFromCart: builder.mutation({
            query: ({ cartId }) => ({
                url: "graphql",
                body: {
                    query: `
                        mutation removeFromCart($cartId: String!) {
                            data: removeFromCart(cartId: $cartId) {
                                id
                            }
                        }
                    `,
                    variables: { cartId },
                },
            }),
        }),
    }),
});

export const {
    useLazyFetchCartQuery,
    useFetchCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useUpdateCartMutation,
} = cartApiSlice;
