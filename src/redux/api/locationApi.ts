import { baseApi } from "./baseApi";

const LOCATION_URL = "/location";
export const locationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLocation: build.mutation({
      query: (data) => ({
        url: `${LOCATION_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Location"],
    }),
    getLocation: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `${LOCATION_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["Location"],
    }),
    locationBasedHotel: build.query({
      query: (id) => ({
        url: `${LOCATION_URL}/hotels/${id}`,
        method: "GET",
      }),
      providesTags: ["Location"],
    }),
    deleteLocation: build.mutation({
      query: (id) => ({
        url: `${LOCATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const {
  useGetLocationQuery,
  useLocationBasedHotelQuery,
  useCreateLocationMutation,
  useDeleteLocationMutation,
} = locationApi;
