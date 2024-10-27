import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL });

const getHeaders = () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
    };

    return headers;
};

export const authApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
        signup: builder.query({
            query: ({ firstName, lastName, email, password }) => ({
                url: "/graphql",
                method: "POST",
                body: {
                    query: `
						mutation CreateUser($data: CreateUserInput!) {
							createUser(data: $data) {
								token
								user {
									id
									first_name
									last_name
									email
								}
							}
						}
					`,
                    variables: {
                        data: {
                            first_name: firstName,
                            last_name: lastName,
                            email,
                            password,
                        },
                    },
                },
            }),
            transformResponse: (response) => response?.data?.signup || null,
            transformErrorResponse: (response) => response,
        }),
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
                headers: getHeaders(),
            }),
            transformResponse: (response) => response?.data || null,
        }),
    }),
});

export const { signup, login } = authApiSlice.endpoints;

export const { useLoginQuery, useCurrentUserQuery, useLazyCurrentUserQuery } =
    authApiSlice;
