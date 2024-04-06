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

export const checkoutApiSlice = createApi({
    reducerPath: "checkoutApi",
    baseQuery,
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: ({ userId, name, email }) => ({
                url: "graphql",
                body: {
                    query: `
					mutation createOrder($data: createOrderInput) {
						data: createOrder(data: $data){
							id
							customer_name
							customer_email
							cart {
							id
							product {
								name
								description
							}
							quantity
							}
							user {
							id
							}
							payment {
							id
							key_id
							amount
							currency
							}
							status
						}
						}   
					`,
                    variables: {
                        data: {
                            user_id: userId,
                            customer_name: name,
                            customer_email: email,
                        },
                    },
                },
            }),
            transformResponse: (response) => response?.data || null,
        }),
        verifyOrder: builder.mutation({
            query: ({
                order_id,
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            }) => ({
                url: "graphql",
                body: {
                    query: `mutation verifyOrder($data: VerifyOrderInput) {
						data: verifyOrder(data: $data){
						  id
						  customer_name
						  customer_email
						  cart {
							id
							product {
							  name
							  description
							}
							quantity
						  }
						  status
						}
					  }
					`,
                    variables: {
                        data: {
                            order_id,
                            payment: {
                                razorpay_order_id,
                                razorpay_payment_id,
                                razorpay_signature,
                            },
                        },
                    },
                },
            }),
        }),
    }),
});

export const { useCreateOrderMutation, useVerifyOrderMutation } =
    checkoutApiSlice;
