"use client";

import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
// or only core styles
import "@splidejs/splide/css/core";
import { useSingleTourQuery } from "@/redux/api/tourApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setTourBookingInfo } from "@/redux/Features/tourBookingSlice";
import TourPlan from "@/app/components/ui/Accordion/tourPlan";
const TourDetails = ({ params }) => {
  console.log(params);
  const router = useRouter();
  const { data: tourData, isLoading } = useSingleTourQuery(params?.id);
  console.log(tourData);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    member: 1,
  });
  const handleOption = (name: any, operation: any) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const totalAmount = tourData?.price * options.member;
  const dispatch = useAppDispatch();
  const handleBook = () => {
    const serializedOptions = {
      member: options.member,
    };
    console.log(serializedOptions);
    dispatch(
      setTourBookingInfo({
        tourInfo: tourData,
        totalAmount,
        options: serializedOptions,
      })
    );

    router.push(`/tour/${tourData.id}/booking`);
  };

  return (
    <div className="">
      <Splide
        // hasTrack={false}
        options={{
          type: "loop",
          rewind: true,
          width: "100%",
          autoplay: true,
          heightRatio: 0.35,
          direction: "ttb",
          arrows: false,
          paginationDirection: "ttb",
        }}
        aria-label="My Favorite Images"
      >
        <SplideSlide>
          <img
            className="object-cover w-full h-full  opacity-50"
            src={tourData?.images[0]}
            alt="Image 1"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            className="object-cover w-full h-full opacity-50"
            src={tourData?.images[0]}
            alt="Image 1"
          />
        </SplideSlide>
      </Splide>

      <div className="">
        <div className="px-20 bg-gray-100">
          <div className="py-10 flex w-full justify-between gap-3">
            <div className="w-3/5 ">
              <div className=" ">
                <div className="text-2xl font-semibold">
                  <p>{tourData?.title}</p>
                  <p>{tourData?.price} /Per Person</p>
                </div>
                <div className="text-xl font-semibold">
                  <p>{tourData?.duration}</p>
                  <p>{tourData?.starting_date}</p>
                </div>
              </div>
              <p className="text-2xl font-bold my-5">Overview</p>
              <p>
                Tour and travel refer to the activities related to planning,
                organizing, and experiencing trips to various destinations for
                leisure, exploration, adventure, or relaxation.Choose your
                destination based on your interests and preferences, whether
                it's a cultural experience, a natural adventure, historical
                exploration, or a beach vacation. Book suitable accommodation,
                which can range from hotels, resorts, hostels, vacation rentals,
                or even camping depending on your travel style and
                destination.Arrange transportation to and within your
                destination. This can include flights, trains, buses, rental
                cars, or even cruises.
              </p>

              <div>
                <p>Tour Plan</p>
                <TourPlan />
              </div>
            </div>
            <div className="w-2/5 ">
              <div className="bg-white p-12">
                <div className="text-center">
                  <p className="text-2xl font-bold">Book Your Tour</p>
                  <p className="my-3">
                    Reserve your ideal trip early for a hassle-free trip; secure
                    comfort and convenience!
                  </p>
                </div>

                <div className="w-full  flex items-center ">
                  <div className="w-full">
                    <div
                      className=" bg-white 
                       w-full flex justify-between py-3 "
                    >
                      <div className="flex">
                        <p className="font-semibold">Adult :</p>
                        <div className="mx-5">{tourData?.price}/Per Person</div>
                      </div>
                      <div className="">
                        {/* <span className="text-gray-700">Member</span> */}
                        <div className="flex align-middle  justify-around space-x-4">
                          <button
                            disabled={options.member <= 1}
                            className="text-gray-700 hover:text-blue-500 border-2 px-1 rounded-md "
                            onClick={() => handleOption("member", "d")}
                          >
                            -
                          </button>
                          <span className="text-gray-700 font-semibold">
                            {options.member}
                          </span>
                          <button
                            className="text-gray-700 hover:text-blue-500 border-2 rounded-md px-1"
                            onClick={() => handleOption("member", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* )} */}
                  </div>
                </div>

                <div>
                  <div className="text-center my-3 text-xl">
                    Total Amount :
                    <span className="font-bold"> ${totalAmount}</span>
                  </div>
                  <button
                    onClick={handleBook}
                    className="w-full border-2 border-sky-500 px-8 py-3 text-xl text-sky-500 duration-200 hover:bg-sky-500 hover:text-white"
                  >
                    <p className="text-center">Book Now</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
