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
            query: ({ userId }) => ({
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
                            customer_name: "AP", //@TODO: fix
                            customer_email: "ap@gmail.com",
                        },
                    },
                },
            }),
        }),
    }),
});

export const { useCreateOrderMutation } = checkoutApiSlice;
