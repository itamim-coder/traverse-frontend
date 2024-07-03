import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    hotelBookings: 4000,
    tourBookings: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    hotelBookings: 3000,
    tourBookings: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    hotelBookings: 2000,
    tourBookings: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    hotelBookings: 2780,
    tourBookings: 3908,
    amt: 2000,
  },
  {
    name: "May",
    hotelBookings: 1890,
    tourBookings: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    hotelBookings: 2390,
    tourBookings: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    hotelBookings: 3490,
    tourBookings: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    hotelBookings: 4000,
    tourBookings: 2400,
    amt: 2400,
  },
  {
    name: "Sep",
    hotelBookings: 3000,
    tourBookings: 1398,
    amt: 2210,
  },
  {
    name: "Oct",
    hotelBookings: 2000,
    tourBookings: 9800,
    amt: 2290,
  },
  {
    name: "Nov",
    hotelBookings: 2780,
    tourBookings: 3908,
    amt: 2000,
  },
  {
    name: "Dec",
    hotelBookings: 3490,
    tourBookings: 4300,
    amt: 2100,
  },
];

export default function OrderChart() {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="tourBookings"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="hotelBookings" stroke="#82ca9d" />
    </LineChart>
  );
}
