import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    method: "POST",
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        const jwtToken = localStorage.getItem("jwtToken");

        if (jwtToken) {
            headers.set("Authorization", `Bearer ${jwtToken}`);
        }
        return headers;
    },
});

export const ordersApiSlice = createApi({
    reducerPath: "ordersApi",
    baseQuery,
    endpoints: (builder) => ({
        fetchOrders: builder.query({
            query: () => ({
                url: "/graphql",
                body: {
                    query: `
						query AllOrders($page: Int, $perPage: Int) {
							allOrders(page: $page, perPage: $perPage) {
								id
								cart {
									product {
										name
										price
										image
									}
									quantity
									status
								}
								created_at
							}
						}
					`,
                },
            }),
            transformResponse: (response) => {
                return response?.data?.fetchCart;
            },
        }),
    }),
});

export const { useFetchOrdersQuery } = ordersApiSlice;
