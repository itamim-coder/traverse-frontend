"use client";

import { Link } from "react-scroll";
import React, { useState } from "react";
import Image from "next/image";
import HotelBooking from "@/app/components/hotelBooking/hotelBooking";
import TourBooking from "@/app/components/tourBooking/tourBooking";
import { LiaHotelSolid } from "react-icons/lia";
import { SlLocationPin } from "react-icons/sl";
import HotelBookingManage from "@/app/components/admin/HotelBookingManage/HotelBookingManage";
import TourBookingManage from "@/app/components/admin/TourBookingManage/TourBookingManage";
const BookingManagement = () => {
  const [activeSection, setActiveSection] = useState("hotel");

  const handleSectionChange = (sectionId: React.SetStateAction<string>) => {
    setActiveSection(sectionId);
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="">
          <div className="">
            <div className="">
              <div className="flex mb-4 justify-center">
                <Link
                  to="hotel"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={`px-16 ${
                    activeSection === "hotel" ? "text-main " : ""
                  } py-2 text-lg px-1 font-semibold`}
                  onClick={() => handleSectionChange("hotel")}
                >
                  <span className="flex items-center">
                    <LiaHotelSolid />
                    Hotel
                  </span>
                </Link>
                <Link
                  to="tour"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={`px-16 ${
                    activeSection === "tour" ? "text-main " : ""
                  } py-2 text-lg px-1 font-semibold`}
                  onClick={() => handleSectionChange("tour")}
                >
                  <span className="flex items-center ">
                    <SlLocationPin />
                    Tour
                  </span>
                </Link>
              </div>
              <div
                id="hotel"
                style={{
                  display: activeSection === "hotel" ? "block" : "none",
                }}
              >
                {/* ... Description content ... */}
                <HotelBookingManage />
              </div>
              <div
                id="tour"
                style={{
                  display: activeSection === "tour" ? "block" : "none",
                }}
              >
                <TourBookingManage />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingManagement;
