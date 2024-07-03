"use client";
import Alert from "@/app/components/ui/Alert/alert";
import { useHotelDetailsQuery } from "@/redux/api/hotelApi";
import { useDeleteRoomCategoryMutation } from "@/redux/api/roomApi";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const HotelDetails = ({ params }) => {
  console.log(params);
  const { data: hotelDetails, isLoading } = useHotelDetailsQuery(params?.id);
  const [deleteRoomCategory] = useDeleteRoomCategoryMutation();
  const rooms = hotelDetails?.rooms;
  console.log(rooms);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteRoomCategory(id);
      if (res?.id) {
        toast.success("Delete Succesfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Somthing Went Wrong");
    }
  };

  return (
    <div className="m-5">
      <div className="flex justify-between">
        <div className="flex">
          <img
            src={hotelDetails?.photos[0]}
            className="object-cover rounded  w-64 h-32"
            alt=""
          />
          <div className="mx-3">
            <p>{hotelDetails?.name}</p>
            <p>{hotelDetails?.address}</p>
          </div>
        </div>
        <div>
          <button className="btn btn-info">Info</button>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">
            Room Category Info :{" "}
            <span className="text-sm">{rooms?.length} Available</span>
          </p>
          <div>
            <Link
              href={`/admin/manage-hotel/view-hotels/${params?.id}/create-room-category`}
              className="bg-blue-500 mx-1 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md"
            >
              Create Room Category
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[100%] shadow-md  mx-auto border-gray-100 my-6">
            <thead>
              <tr className=" text-black ">
                <th className="py-4 px-6 text-base font-medium text-left border-b ">
                  Serial
                </th>
                <th className="py-4 px-6 text-base font-medium text-left  border-b">
                  Room Type
                </th>
                <th className="py-4 px-6 text-base font-medium text-left border-b ">
                  Max People
                </th>
                <th className="py-4 px-6 text-base font-medium text-left border-b ">
                  Price
                </th>

                <th className="py-4 px-6 text-base font-medium border-b text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms?.map((data: any, index: number) => (
                <>
                  <tr className="hover:bg-gray-50 border-b transition duration-300">
                    <td className="py-4 px-6 border-b text-base font-medium font-medium">
                      {index + 1}
                    </td>

                    <td className="py-4 px-6 border-b text-base font-medium">
                      {data.name}
                    </td>
                    <td className="py-4 px-6 border-b text-base font-medium">
                      {data.maxPeople}
                    </td>
                    <td className="py-4 px-6 border-b text-base font-medium">
                      {data.price}
                    </td>

                    <td className="py-4 px-6  border-b text-end">
                      <Link
                        href={`/admin/manage-hotel/room-details/${data?.id}`}
                        className="bg-blue-500 mx-1 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleDelete(data.id)}
                        className="bg-red-500 mx-1 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Alert />
    </div>
  );
};

export default HotelDetails;
