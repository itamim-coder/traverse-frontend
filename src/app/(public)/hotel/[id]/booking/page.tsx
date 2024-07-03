"use client";
import FormInput from "@/app/components/Forms/FormInput";
import Form from "@/app/components/Forms/form";
import Alert from "@/app/components/ui/Alert/alert";
import { getUserInfo, isLoggedIn } from "@/app/services/auth.services";
import { useBookHotelMutation } from "@/redux/api/bookingApi";
import { useReserveAroomMutation } from "@/redux/api/roomApi";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
type FormValues = {
  email: string;
  password: string;
};
const HotelBooking = () => {
  const router = useRouter();
  if (!isLoggedIn()) {
    return router.push("/login");
  }
  const { dates, days, selectedRooms, totalAmount, options, roomInfo } =
    useAppSelector((state) => state.hotelBooking);
  const lastDay = dates.length - 1;
  const date1 = new Date(dates[0]);
  const date2 = new Date(dates[lastDay]);
  useEffect(() => {
    console.log(router); // Alerts 'Someone'
  }, [router]);
  const checkin = date1.toLocaleDateString();
  const checkout = date2.toLocaleDateString();
  console.log(checkin);
  // console.log(window.history);
  // const hotelId = console.log(roomInfo?.hotel?.id);
  // useEffect(() => {
  //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //     e.preventDefault();
  //     e.returnValue = "";
  //     // alert("previous url is: " + window.history);
  //     // Use the Next.js router to navigate back to the previous page
  //     router.push(`/hotel/${roomInfo?.hotel?.id}`); //
  //     // history.back()
  //   };

  //   // Add the event listener for beforeunload to capture browser refresh
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     // Clean up the event listener when the component unmounts
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [router]);

  if (!days || days <= 0) {
    // alert("previous url is: " + window.history.previous.href);
    // Redirect to the previous page or any other desired page
    router.back(); // Change '/previous-page' to your desired URL
    return null; // You can also return a loading state or an error message if needed
  }
  const [hotelBooking] = useBookHotelMutation();
  const [reserveAroom] = useReserveAroomMutation();
  const { userId: loginUserId } = getUserInfo();
  console.log(loginUserId);
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      //   const res = await userLogin({ ...data }).unwrap();
      data.userId = loginUserId;
      data.hotelBooks = {
        dates,
        days,
        selectedRooms,
        totalAmount,
        options,
        roomInfo,
      };
      console.log(data);
      const res = await hotelBooking({ ...data }).unwrap();
      console.log(res);
      if (res.id) {
        toast.success("Successfully Booked...");
      }

      selectedRooms.map(async (roomId) => {
        const unavailableDates = dates.map((date) =>
          new Date(date).toISOString()
        );

        const roomData = {
          unavailableDates, // Add the unavailableDates property
        };
        console.log(roomId);
        const updatedData = await reserveAroom({ id: roomId?.id, roomData });
        // console.log(updatedData);
        // const res = axios.put(`/rooms/availability/${roomId}`, {
        //   dates: alldates,
        // });

        return res.data;
      });
    } catch (err) {}
  };
  return (
    <div className="px-24 bg-background min-h-screen">
      <div className="flex gap-3">
        <div className="w-3/5 ">
          <div className="bg-white my-5 ">
            <div className="p-5 pl-10">
              <p className="text-md font-semibold">Your Booking Details</p>
              <div className="flex pt-5 justify-between">
                <div>
                  <p className="font-semibold"> {roomInfo?.hotel?.name}</p>
                  <p className="text-sm ">{options.adult} Adult</p>
                </div>
                <div>
                  <div className="mask  w-36 h-20">
                    <img
                      className="rounded"
                      src={roomInfo?.photos[0]}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-md font-semibold">{roomInfo?.name}</p>
                <p className="text-sm font-semibold">Room Number:</p>
                {selectedRooms?.map((room) => (
                  <div key={room.id}>
                    <p className="text-sm">{room.roomNumber}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white my-5  ">
            <p className="pt-5 text-xl font-semibold px-10">Guest Details</p>
            <div className=" py-8 px-4  sm:px-10">
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
                    className="group py-3 font-semibold relative w-full flex justify-center  px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            <p className="p-2 bg-gray-100 text-center font-bold">
              Price Summary
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
                      {roomInfo?.name} x {selectedRooms.length}
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
            <div className="px-6 py-3">
              <p className=" text-gray-900 text-base ">
                <span className="font-semibold">Date: </span>
                {checkin} to {checkout} <br />{" "}
                <span className="text-sm">({days}/nights)</span>
              </p>
              <p className=" text-gray-900 text-base ">
                <span className="font-semibold">Room: </span>
                {roomInfo.name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Alert />
    </div>
  );
};

export default HotelBooking;
