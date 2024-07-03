"use client";

import { token } from "@/app/services/auth.services";
import { useUserHotelQuery, useUserTourQuery } from "@/redux/api/bookingApi";
import React from "react";

const TourBooking = () => {
  const { data: tourData } = useUserTourQuery(undefined);
  const data = tourData?.data?.result;
  console.log(data);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Days</th>
              <th>Member</th>
              <th>Total Amount</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map((dt, index) => (
              <tr>
                <td className="w-32 mask mask-squircle">
                  <img src={dt?.tourBooks?.tourInfo?.images[0]} alt="" />
                </td>
                <td className="text-black font-semibold">
                  {dt?.tourBooks?.tourInfo?.title}
                </td>
                <td className="text-black font-semibold">
                  {dt?.tourBooks?.tourInfo?.duration}
                </td>
                <td className="text-black font-semibold">
                  {dt?.tourBooks?.options?.member}
                </td>
                <td className="text-black font-semibold">
                  {dt?.tourBooks?.totalAmount}
                </td>
                <td className="text-black font-semibold">{dt?.status}</td>
              </tr>
            ))}
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TourBooking;
