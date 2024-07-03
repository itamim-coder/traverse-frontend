"use client";

import { token } from "@/app/services/auth.services";
import { useUserHotelQuery, useUserTourQuery } from "@/redux/api/bookingApi";
import React from "react";

const HotelBooking = () => {
  const { data: hotelData } = useUserHotelQuery(undefined);

  const data = hotelData?.data?.result;
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
              <th>Room Type</th>
              <th>Days</th>
              <th>Total Amount</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map((dt, index) => (
              <tr>
                <td className="w-32 mask mask-squircle">
                  <img
                    src={dt?.hotelBooks?.roomInfo?.hotel?.photos[0]}
                    alt=""
                  />
                </td>
                <td className="text-black font-semibold">
                  {dt?.hotelBooks?.roomInfo?.hotel?.name}
                </td>
                <td className="text-black font-semibold">
                  {dt?.hotelBooks?.roomInfo?.name}
                </td>
                <td className="text-black font-semibold">
                  {dt?.hotelBooks?.days}
                </td>
                <td className="text-black font-semibold">
                  {dt?.hotelBooks?.totalAmount}
                </td>
                <td className="text-black font-semibold"> {dt?.status}</td>
              </tr>
            ))}
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelBooking;
