"use client";
import FormInput from "@/app/components/Forms/FormInput";
import Form from "@/app/components/Forms/form";
import Alert from "@/app/components/ui/Alert/alert";
import { getUserInfo, isLoggedIn } from "@/app/services/auth.services";
import { useBookTourMutation } from "@/redux/api/bookingApi";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
type FormValues = {
  email: string;
  password: string;
};
const TourBooking = () => {
  const router = useRouter();
  if (!isLoggedIn()) {
    return router.push("/login");
  }
  const { totalAmount, options, tourInfo } = useAppSelector(
    (state) => state.tourBooking
  );
  const [tourBooking] = useBookTourMutation();
  console.log(getUserInfo());
  const { userId: loginUserId } = getUserInfo();
  console.log(loginUserId);
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      //   const res = await userLogin({ ...data }).unwrap();
      data.userId = loginUserId;
      data.tourBooks = {
        tourInfo,
        totalAmount,
        options,
      };
      console.log("tour", data);
      const res = await tourBooking({ ...data }).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Booking Successfully");
      }
    } catch (err) {
      toast.error("failed");
    }
  };
  return (
    <div className="px-24 bg-background min-h-screen">
      <div className="flex gap-3">
        <div className="w-3/5 ">
          <div className="bg-white mt-5 ">
            <div className="p-5 pl-10">
              <p className="text-md font-semibold">Your Booking Details</p>
              <div className="flex pt-5 justify-between">
                <div>
                  <p className="font-semibold"> {tourInfo?.title}</p>
                  <p className="text-sm ">{options.member} Member</p>
                </div>
                <div>
                  <div className="mask  w-20 h-20">
                    <img
                      className="rounded"
                      src={tourInfo?.images[0]}
                      alt="Tour Package Image"
                    />
                  </div>
                </div>
              </div>
              <div>
                <span className="text-md font-semibold">Starting Date : </span>{" "}
                {tourInfo?.starting_date}
                <br />
                <span className="text-md font-semibold">Departure : </span>
                {tourInfo?.departure}
              </div>
            </div>
          </div>
          <div className="bg-white my-5  ">
            <p className="pt-5 text-xl font-semibold px-10">Guest Details</p>
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div>
                <Form submitHandler={onSubmit}>
                  <div>
                    <FormInput
                      name="customer_name"
                      type="text"
                      size="large"
                      label="Guest Name"
                      className="w-full px-4 py-3 rounded border-2 
                      hover:border-black
                      focus:dark:border-violet-400"
                    />
                  </div>
                  <div className="my-4">
                    <FormInput
                      name="phone"
                      type="number"
                      size="large"
                      label="Guest Number"
                      className="w-full px-4 py-3 rounded border-2 
                      hover:border-black
                      focus:dark:border-violet-400"
                    />
                  </div>
                  <div className="my-4">
                    <FormInput
                      name="address"
                      type="text"
                      size="large"
                      label="Guest Address"
                      className="w-full px-4 py-3 rounded border-2 
                      hover:border-black
                      focus:dark:border-violet-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative py-3 font-semibold w-full flex justify-center  px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Confirm Booking
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white w-2/5 border p-5 my-5">
          <div className="">
            <p className="p-2 bg-gray-100 text-center font-semibold">
              Your Price Summary
            </p>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Details
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      <p>
                        {" "}
                        {tourInfo?.title} X {options.member}
                      </p>
                    </th>

                    <td className="px-6 py-4">{totalAmount}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-gray-900 ">
                    <th scope="row" className="px-6 py-3 text-base">
                      Total
                    </th>

                    <td className="px-6 py-3">{totalAmount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-base px-6 py-3">
                {/* Date: {checkin} to {checkout} <br />{" "} */}
                {/* <span className="text-sm">({days}/nights)</span> */}
              </p>
              <p className="font-semibold text-gray-900 text-base px-6 py-3">
                {/* Room: {roomInfo.name} */}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Alert />
    </div>
  );
};

export default TourBooking;
