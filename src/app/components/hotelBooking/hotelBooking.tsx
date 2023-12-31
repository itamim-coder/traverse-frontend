"use client"

import { token } from "@/app/services/auth.services";
import { useUserHotelQuery, useUserTourQuery } from "@/redux/api/bookingApi";
import React from "react";

const HotelBooking = () => {
  const { data: hotelData } = useUserHotelQuery(undefined);
  const { data: tourData } = useUserTourQuery(undefined);
  console.log(hotelData);

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
              <th>Total Amount</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {hotelData?.map((dt, index) => (
              <tr>
                <th>{index+1}</th>
                <td>{dt?.customer_name}</td>
                <td>{dt?.hotelBooks?.days}</td>
                <td>{dt?.hotelBooks?.totalAmount}</td>
                <td>{dt?.status}</td>
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
