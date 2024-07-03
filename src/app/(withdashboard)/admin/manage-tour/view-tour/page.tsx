"use client";
import Loading from "@/app/components/Loading";
import Alert from "@/app/components/ui/Alert/alert";
import Pagination from "@/app/components/ui/Pagination/Pagination";
import {
  useDeleteHotelMutation,
  useGetHotelsQuery,
} from "@/redux/api/hotelApi";
import {
  useDeleteTourMutation,
  useGetTourQuery,
  useUpdateTourMutation,
} from "@/redux/api/tourApi";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ViewTours = () => {
  const query: Record<string, any> = {};
  const [isChecked, setIsChecked] = useState();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  const { data: tours, isLoading } = useGetTourQuery({ ...query });
  const [deleteTour] = useDeleteTourMutation();
  const [updateTour] = useUpdateTourMutation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  if (isLoading) {
    return <Loading />;
  }
  const meta = tours?.meta;

  const data = tours?.data.result;
  console.log(data);
  // Assuming location.meta.totalPages exists
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber + 1); // Pagination starts from 0, but page state starts from 1
  };

  const handleDelete = async (id: string) => {
    toast.promise(deleteTour(id), {
      loading: "Deleting...",
      success: "Delete Successfully",
      error: "Could not delete.",
    });
  };

  const handleAvailabilityToggle = async (id: string, available: boolean) => {
    try {
      await updateTour({ id, updatedData: { available } }); // Update the tour availability
      toast.success("Availability updated successfully");
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error("Failed to update availability");
    }
  };

  return (
    <div className="m-5">
      <div>
        <p className="text-2xl font-semibold">
          Tours Info : <span className="text-sm">{meta.total} Available</span>
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[100%] shadow-md  mx-auto border-gray-100 my-6">
          <thead>
            <tr className=" text-black ">
              <th className="py-4 px-6 text-base font-medium text-left border-b ">
                Serial
              </th>
              <th className="py-4 px-6 text-base font-medium text-left  border-b">
                Image
              </th>
              <th className="py-4 px-6 text-base font-medium text-left border-b ">
                Package Name
              </th>
              <th className="py-4 px-6 text-base font-medium text-left border-b ">
                Location
              </th>
              <th className="py-4 px-6 text-base font-medium text-left border-b ">
                Starting Date
              </th>
              <th className="py-4 px-6 text-base font-medium text-left border-b ">
                Availability
              </th>
              <th className="py-4 px-6 text-base font-medium border-b text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((data: any, index: number) => (
              <>
                <tr className="hover:bg-gray-50 border-b transition duration-300">
                  <td className="py-4 px-6 border-b text-base font-medium font-medium">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 flex justify-start">
                    <img
                      src={data.images[0]}
                      alt="table navigate ui"
                      className="h-16 w-16 object-cover bg-gray-300"
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-base font-medium">
                    {data.title}
                  </td>
                  <td className="py-4 px-6 border-b text-base font-medium">
                    {data.location.name}
                  </td>
                  <td className="py-4 px-6 border-b text-base font-medium">
                    {data.starting_date}
                  </td>
                  <td className="py-4 px-6 border-b text-base font-medium">
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked={data.available}
                      onChange={() =>
                        handleAvailabilityToggle(data.id, !data.available)
                      }
                    />
                  </td>
                  <td className="py-4 px-6  border-b text-end">
                    <button
                      // href={`/admin/manage-hotel/view-hotels/${data?.id}`}
                      className="bg-blue-500 mx-1 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md"
                    >
                      Details
                    </button>
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

      <Pagination
        currentPage={page - 1} // Subtract 1 to sync with pagination component
        totalPages={meta?.totalPage || 0}
        onPageChange={handlePageChange}
      />
      <Alert />
    </div>
  );
};

export default ViewTours;
