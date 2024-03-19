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
    }),
  }),
});

export const { login } = authApiSlice.endpoints;

export const { useLoginQuery } = authApiSlice;
