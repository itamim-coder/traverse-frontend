import { baseApi } from "./baseApi";

const TOUR_URL = "/tour";
export const tourApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTour: build.mutation({
      query: (data) => ({
        url: `${TOUR_URL}/create-tour`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["tour"],
    }),
    getTour: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `${TOUR_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["tour"],
    }),
    getAvailableTour: build.query({
      query: () => ({
        url: `${TOUR_URL}/available`,
        method: "GET",
      }),
      providesTags: ["tour"],
    }),
    getUpcomingTour: build.query({
      query: () => ({
        url: `${TOUR_URL}/upcoming`,
        method: "GET",
      }),
      providesTags: ["tour"],
    }),
    singleTour: build.query({
      query: (id) => ({
        url: `${TOUR_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["tour"],
    }),
    deleteTour: build.mutation({
      query: (id) => ({
        url: `${TOUR_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tour"],
    }),
    updateTour: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${TOUR_URL}/${id}`,
        method: "PATCH", // Use the PATCH HTTP method for updating
        data: updatedData, // The data to be sent in the request body
      }),
      invalidatesTags: ["tour"], // Invalidate the single room cache
    }),
  }),
});

export const {
  useCreateTourMutation,
  useGetTourQuery,
  useSingleTourQuery,
  useGetAvailableTourQuery,
  useGetUpcomingTourQuery,
  useDeleteTourMutation,
  useUpdateTourMutation,
} = tourApi;
