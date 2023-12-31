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
      invalidatesTags: ["bookingHotel"],
    }),
    bookTour: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/tour`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["bookingTour"],
    }),
    userHotel: build.query({
      query: () => {
        return {
          url: `${BOOKING_URL}/user-hotel`,
          method: "GET",
        };
      },
      providesTags: ["getBookingHotel"],
    }),
    userTour: build.query({
      query: () => {
        return {
          url: `${BOOKING_URL}/user-tour`,
          method: "GET",
        };
      },
      providesTags: ["getBookingTour"],
    }),
  }),
});

export const {
  useBookHotelMutation,
  useBookTourMutation,
  useUserHotelQuery,
  useUserTourQuery,
} = bookingApi;
