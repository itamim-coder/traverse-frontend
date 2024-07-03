"use client";

import {
  useGetAvailableTourQuery,
  useGetUpcomingTourQuery,
} from "@/redux/api/tourApi";
import Link from "next/link";
import React from "react";
import { BiSolidTimeFive } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const FeaturedTour = () => {
  const { data: tourData, isLoading } = useGetAvailableTourQuery(undefined);
  const { data: upcomingTours } = useGetUpcomingTourQuery(undefined);

  console.log(tourData);
  console.log(upcomingTours);
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <h1 className="font-title text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Featured <br /> Tour
      </h1>

      <div className="container mt-2 mx-auto p-4 md:p-0">
        <div className="grid grid-cols-3 ">
          <div className=" col-span-2 ">
            {tourData?.map((tour: any) => (
              <>
                <div className="flex mb-3 shadow-md bg-gray-100 border">
                  <div className="w-1/3">
                    <img src={tour.images[0]} className="h-52 w-64" alt="" />
                  </div>
                  <div className="grid grid-rows-3 m-5 w-2/3">
                    <div>
                      <p>{tour.title}</p>
                      <p className="text-sm">{tour.duration}</p>
                    </div>
                    <div className="flex  justify-between ">
                      <p className="flex  items-center">
                        <BiSolidTimeFive className="text-lg" />
                        <span className="text-xs">
                          Date <br />
                          {tour.starting_date}
                        </span>
                      </p>

                      <p className="flex items-center">
                        <FaLocationDot className="text-lg" />
                        <span className="text-xs">
                          Departure <br />
                          {tour.departure}
                        </span>
                      </p>

                      <p>
                        <span className="text-xs text-right">From</span> <br />
                        <span className="text-lg font-bold">{tour.price}</span>
                      </p>
                    </div>
                    <div className="mt-auto flex justify-between">
                      {/* <Link
                        href={`/tour/${tour.id}`}
                        className="btn btn-sm btn-outline hover:bg-CC584A"
                      >
                        Details
                      </Link> */}
                      <div></div>
                      <Link
                        href={`/tour/${tour.id}`}
                        className="btn btn-sm btn-outline hover:bg-CC584A"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="ml-20">
            <div>
              <h1 className="text-xl font-bold mb-3">
                Up Coming <br /> Tour
              </h1>
              <div className="">
                {upcomingTours?.map((dt: any) => (
                  <div className="bg-gray-100 mb-6 shadow-md">
                    <img
                      className="h-40 w-full object-cover"
                      src={dt?.images[0]}
                      alt=""
                    />
                    <div className="flex justify-between m-2">
                      <div>
                        <p className="text-sm">{dt.title}</p>
                        <p className="text-xs">{dt.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-right">From</p>
                        <p className="font-semibold">{dt.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTour;
