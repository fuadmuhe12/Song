import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../../../constants";
import { CategoryAPIResponse, SingleAPIResponse } from "../type";

type typeOfSongUpdate = {
    id: number;
    data: {
        title: string | undefined;
        artist: string | undefined;
        duration: number | undefined;
        catagory: string | undefined;
        description: string | undefined;
        coverPhotoUrl: string | undefined;
        audioUrl: string | undefined;
    }
}
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        getCateogries: builder.query<CategoryAPIResponse, void>({
            query: () => "category",
        }),
        updateSong: builder.mutation<SingleAPIResponse, typeOfSongUpdate>({
            query: (updateData) => ({
                url: `song/${updateData.id}`,
                method: "PUT",
                body: updateData.data
            }),
        }),
        deleteSong: builder.mutation<SingleAPIResponse, number>({
            query: (id) => ({
                url: `song/${id}`,
                method: "DELETE",
            })
        }),
        getSongById: builder.query<SingleAPIResponse, number>({
            query: (id) => ({
                url: `song/${id}`,
                method: "GET"
            })
        })
    }),
});


export const { useGetCateogriesQuery, useUpdateSongMutation, useDeleteSongMutation, useGetSongByIdQuery } = apiSlice;