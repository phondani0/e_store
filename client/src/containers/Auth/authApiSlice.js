import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL });

export const authApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
        login: builder.query({
            query: ({ email, password }) => ({
                url: "/graphql",
                method: "POST",
                body: {
                    query: `
						query {
							login(email: "${email}", password: "${password}") {
								token
								user {
									id
									first_name
									last_name
									email
									mobile
									created_at
									updated_at  
								}
							}
						}
						`,
                },
            }),
            transformResponse: (response) => response?.data?.login || null,
            transformErrorResponse: (response) => response,
        }),
        currentUser: builder.query({
            query: () => ({
                url: "/graphql",
                method: "POST",
                body: {
                    query: `
						query getCurrentUser {
							currentUser {
								id
								first_name
								last_name
								email
								mobile
								created_at
								updated_at  
							}
						}
					`,
                },
            }),
            transformResponse: (response) => response?.data || null,
        }),
    }),
});

export const { login } = authApiSlice.endpoints;

export const { useLoginQuery, useCurrentUserQuery, useLazyCurrentUserQuery } =
    authApiSlice;
