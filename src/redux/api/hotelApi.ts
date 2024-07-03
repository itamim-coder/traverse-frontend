import { baseApi } from "./baseApi";

const HOTEL_URL = "/hotel";
export const hotelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHotel: build.mutation({
      query: (data) => ({
        url: `${HOTEL_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["hotel"],
    }),
    getHotels: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `${HOTEL_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["hotel"],
    }),
    hotelDetails: build.query({
      query: (id) => ({
        url: `${HOTEL_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["hotel", "room"],
    }),
    deleteHotel: build.mutation({
      query: (id) => ({
        url: `${HOTEL_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hotel"],
    }),
  }),
});

export const {
  useCreateHotelMutation,
  useGetHotelsQuery,
  useHotelDetailsQuery,
  useDeleteHotelMutation,
} = hotelApi;
