import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api'}),
    endpoints: builder => ({
        getChats: builder.query({
            query: userId => `/chat/${userId}`
        })
    })
});

export const { useGetChatsQuery } = apiSlice
