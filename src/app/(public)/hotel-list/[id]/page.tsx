"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLocationBasedHotelQuery } from "@/redux/api/locationApi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchQuery } from "@/redux/Features/hotelSlice";
import { BsArrowUpRight } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
const HotelList = ({ params }) => {
  const [priceRange, setPriceRange] = useState(100000);

  const { searchQuery } = useAppSelector((state) => state.hotel);

  const { data: hotelData, isLoading } = useLocationBasedHotelQuery(params.id);
  const dispatch = useAppDispatch();

  const handlePriceChange = (e) => {
    setPriceRange(parseFloat(e.target.value));
  };

  const handleSearch = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  const filteredItems = hotelData?.Hotel?.filter((item) => {
    const range_hotel = item.cheapest_price <= priceRange;
    const searchMatch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());

    return range_hotel && searchMatch;
  });

  return (
    <div className="min-h-screen mx-25 bg-background">
      <div className="flex  ">
        <div className="w-1/4 min-h-screen bg-white my-8 mx-4 p-4">
          <p className="my-3 font-semibold">Search Hotels</p>
          <div className="form-control">
            <p className="my-3">Hotel Name</p>
            <div className="relative">
              <FaLocationDot className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="   Search hotel name..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="input w-full input-bordered input-sm lg:input-md rounded pl-10"
              />
            </div>
          </div>
          <p className="mt-5 mb-3 font-semibold">Filter By Price</p>

          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={priceRange}
            onChange={handlePriceChange}
            className="range range-xs range-primary"
          />
          <div className="my-3 font-semibold  text-base">
            Price :{" "}
            <span className="py-1 px-3 rounded bg-blue-100 text-blue-800">
              ${priceRange.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="w-3/4 min-h-screen my-8 mx-4">
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container min-h-screen px-5 mx-auto bg-white p-4">
              <p className="my-5">Available Hotels : 100</p>
              <div className="mb-4 divide-y-2 divide-gray-100">
                {filteredItems?.map((dt) => (
                  <div
                    key={dt.id}
                    className=" py-8 flex flex-wrap md:flex-nowrap"
                  >
                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <img
                        className="object-cover rounded  w-full h-56 md:h-64 xl:h-64"
                        src={dt.photos[0]}
                        alt=""
                      />
                    </div>
                    <div className="md:flex-grow mx-5 flex-col space-y-14">
                      <div>
                        <h2 className="text-xl font-medium text-gray-900 title-font mb-2">
                          {dt.name}
                        </h2>
                        <p className="flex">
                          {Array.from(
                            { length: dt.average_rating },
                            (_, index) => (
                              <AiFillStar
                                key={index}
                                className="text-yellow-500"
                              />
                            )
                          )}
                          {Array.from(
                            { length: 5 - dt.average_rating },
                            (_, index) => (
                              <AiOutlineStar
                                key={index}
                                className="text-yellow-500"
                              />
                            )
                          )}
                        </p>
                      </div>
                      <p className="leading-relaxed text-sm">
                        {dt.address}
                        <br />
                        {dt.city}
                      </p>
                      <div className=" flex justify-between items-center mt-4">
                        <div>
                          <p>Starting From</p>
                          <p className="text-black font-semibold">
                            {dt.cheapest_price}
                          </p>
                        </div>
                        <div>
                          <Link
                            className="btn text-white btn-outline bg-indigo-600 hover:bg-blue-900"
                            href={`/hotel/${dt.id}`}
                          >
                            See Availability <BsArrowUpRight />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
