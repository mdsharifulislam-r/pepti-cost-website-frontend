import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      // Add authorization headers or other headers here if needed
      return headers
    },
  }),
  tagTypes: ['Articles', 'Vendors', 'Compare'],
  endpoints: () => ({
    // Add your query and mutation endpoints here
    // Example:
    // getArticles: builder.query<Article[], void>({
    //   query: () => '/articles',
    //   providesTags: ['Articles'],
    // }),
  }),
})
