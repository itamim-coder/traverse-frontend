"use client";

import { useGetLocationQuery } from "@/redux/api/locationApi";
import Link from "next/link";
import { useState } from "react";

export const FeaturedLocation = () => {
  const { data: location, isLoading } = useGetLocationQuery({ size: 4 });
  console.log(location);
  const Locations = location?.data.result;
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
        <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:mb-6 group font-title">
          <span className="inline-block mb-1 sm:mb-4">
            Featured
            <br className="hidden md:block" />
            Location
          </span>
          <div className="h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-30 group-hover:scale-x-100" />
        </h2>
        <p className="text-gray-700 lg:text-sm lg:max-w-md">
          "Sed ut perspiciatis unde omnis iste natus error sit iste voluptatem
          accusantium doloremque rem aperiam, ipsa eaque quae. Sed ut
          perspiciatis unde omnis iste."
        </p>
      </div>
      <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2">
        {Locations?.map((dt: any) => (
          <>
            <Link href={`/hotel-list/${dt?.id}`} aria-label="View Item">
              <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
                <img
                  className="object-cover w-full h-56 md:h-64 xl:h-80"
                  src={dt?.image}
                  alt=""
                />
                <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
                  <p className="text-sm font-medium tracking-wide text-white">
                    {dt?.name}
                  </p>
                </div>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};
