"use client";
import OrderChart from "@/app/components/admin/Dashboard/OrderChart";
import TotalOrdersBarChart from "@/app/components/admin/Dashboard/TotalOrdersBarChart";
import React from "react";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdHotel, MdTravelExplore } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="m-5">
      <p className="text-3xl font-bold my-3">Dashboard</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded p-4 bg-background border-orange-400 hover:shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-xl font-semibold">Total Orders</p>
              <p className="text-lg font-semibold"> 100</p>
            </div>
            <div>
              <FaShoppingCart className="text-5xl text-orange-400" />
            </div>
          </div>
        </div>
        <div className="border rounded p-4 bg-background border-orange-400 hover:shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-xl font-semibold">Total Locations</p>
              <p className="text-lg font-semibold"> 100</p>
            </div>
            <div>
              <FaLocationDot className="text-5xl text-orange-400" />
            </div>
          </div>
        </div>
        <div className="border rounded p-4 bg-background border-orange-400 hover:shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-xl font-semibold">Total Hotels</p>
              <p className="text-lg font-semibold"> 100</p>
            </div>
            <div>
              <MdHotel className="text-5xl text-orange-400" />
            </div>
          </div>
        </div>
        <div className="border rounded p-4 bg-background border-orange-400 hover:shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-xl font-semibold">Total Tours</p>
              <p className="text-lg font-semibold"> 100</p>
            </div>
            <div>
              <MdTravelExplore className="text-5xl text-orange-400" />
            </div>
          </div>
        </div>
        <div className="border rounded p-4 bg-background border-orange-400 hover:shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-xl font-semibold">Total Users</p>
              <p className="text-lg font-semibold"> 100</p>
            </div>
            <div>
              <FaUsers className="text-5xl text-orange-400" />
            </div>
          </div>
        </div>
        <div className="border rounded p-4 bg-background border-orange-400 hover:shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-xl font-semibold">Total Reviews</p>
              <p className="text-lg font-semibold"> 100</p>
            </div>
            <div>
              <FaUsers className="text-5xl text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="my-3 ">
        <p className="text-sl font-semibold my-5">Earnings Statistics</p>
        <OrderChart />
      </div>
      <div className="my-3 ">
        <p className="text-sl font-semibold my-5">Total Orders</p>
        <TotalOrdersBarChart />
      </div>
    </div>
  );
};

export default Dashboard;
