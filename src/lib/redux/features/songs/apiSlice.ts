import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../../../constants";
import { CategoryAPIResponse, SingleAPIResponse } from "../type";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        getCateogries: builder.query<CategoryAPIResponse, void>({
            query: () => "category",
        }),
        updateSong: builder.mutation<SingleAPIResponse, number>({
            query: (id) => ({
                url: `song/${id}`,
                method: "PUT",
            }),
        }),
        deleteSong: builder.mutation<SingleAPIResponse, number>({
            query: (id) => ({
                url: `song/${id}`,
                method: "DELETE",
            })
        })
    }),
});


export const { useGetCateogriesQuery, useUpdateSongMutation, useDeleteSongMutation } = apiSlice;