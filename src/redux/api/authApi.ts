import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
        query: (loginData) => ({
            url:`${ AUTH_URL}/signin`,
            method: "POST",
            data: loginData
        }),
        invalidatesTags:["user"]
    }),
    userSignup: build.mutation({
      query: (signupData) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: signupData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUserSignupMutation, useUserLoginMutation } = authApi;
