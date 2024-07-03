import { baseApi } from "./baseApi";

const USER_URL = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userProfile: build.query({
      query: () => {
        return {
          url: `${USER_URL}/profile`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getUsers: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `${USER_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["user"],
    }),
    updateUser: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${USER_URL}/${id}`,
        method: "PATCH", // Use the PATCH HTTP method for updating
        data: updatedData, // The data to be sent in the request body
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUserProfileQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
