import { getFromLocalStorage } from "@/app/utils/local-storage";
import { baseApi } from "./baseApi";
import { getUserInfo, token } from "@/app/services/auth.services";

const BOOKING_URL = "/booking";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    bookHotel: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/hotel`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["booking"],
    }),
    bookTour: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/tour`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["booking"],
    }),
    userHotel: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `${BOOKING_URL}/user-hotel`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["booking"],
    }),
    userTour: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `${BOOKING_URL}/user-tour`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["booking"],
    }),
  }),
});

export const {
  useBookHotelMutation,
  useBookTourMutation,
  useUserHotelQuery,
  useUserTourQuery,
} = bookingApi;
