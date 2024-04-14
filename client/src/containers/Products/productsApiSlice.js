import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL });

export const productsApiSlice = createApi({
  reducerPath: "productsApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: `
                query {
                    allProducts {
                    id
                    name
                    category
                    price
                    description
                    image
                    }
                }
            `,
        },
      }),
      transformResponse: (response) => response?.data?.allProducts || [],
    }),
  }),
});

export const { useFetchProductsQuery } = productsApiSlice;
