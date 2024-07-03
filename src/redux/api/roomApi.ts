import { baseApi } from "./baseApi";

const ROOM_URL = "/room";
export const roomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRoom: build.mutation({
      query: (data) => ({
        url: `${ROOM_URL}/create-room`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["room"],
    }),
    addRoom: build.mutation({
      query: (data) => ({
        url: `${ROOM_URL}/add-room`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["room"],
    }),
    getSingleRoom: build.query({
      query: (id) => ({
        url: `${ROOM_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["room"],
    }),
    reserveAroom: build.mutation({
      query: ({ id, roomData }) => ({
        url: `${ROOM_URL}/room-no/${id}`,
        method: "PATCH", // Use the PATCH HTTP method for updating
        data: roomData, // The data to be sent in the request body
      }),
      invalidatesTags: ["room"], // Invalidate the single room cache
    }),
    deleteRoomCategory: build.mutation({
      query: (id) => ({
        url: `${ROOM_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hotel", "room"],
    }),
    deleteRoomNo: build.mutation({
      query: (id) => ({
        url: `${ROOM_URL}/room-no/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hotel", "room"],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useAddRoomMutation,
  useGetSingleRoomQuery,
  useReserveAroomMutation,
  useDeleteRoomCategoryMutation,
  useDeleteRoomNoMutation,
} = roomApi;
