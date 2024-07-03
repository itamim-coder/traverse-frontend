"use client";
import Form from "@/app/components/Forms/form";
import FormInput from "@/app/components/Forms/FormInput";
import Alert from "@/app/components/ui/Alert/alert";
import { useHotelDetailsQuery } from "@/redux/api/hotelApi";
import {
  useAddRoomMutation,
  useDeleteRoomCategoryMutation,
  useDeleteRoomNoMutation,
  useGetSingleRoomQuery,
} from "@/redux/api/roomApi";
import Link from "next/link";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import "react-day-picker/dist/style.css";

type FormValues = {
  number: string;
};

const RoomDetails = ({ params }) => {
  console.log(params);
  const { data: roomDetails, isLoading } = useGetSingleRoomQuery(params?.id);
  const [deleteRoomNo] = useDeleteRoomNoMutation();
  const [addRoom] = useAddRoomMutation();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const rooms = roomDetails;
  console.log(rooms);
  console.log(selectedDates);
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    toast.loading("Adding....");
    data.roomId = params?.id;
    try {
      const res = await addRoom(data);
      console.log("res", res);
      if (res?.data?.id) {
        toast.success("Successfully Added");
      }
    } catch (err) {
      toast.error("failed");
      console.log(err);
    }
  };

  const defaultValues = {
    number: "",
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteRoomNo(id);
      if (res?.id) {
        toast.success("Room Delete Successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="m-5">
      <div className="flex justify-between">
        <div className="flex">
          <img
            src={roomDetails?.photos[0]}
            className="object-cover rounded  w-64 h-32"
            alt=""
          />
          <div className="mx-3">
            <p>{roomDetails?.name}</p>
            <p>{roomDetails?.address}</p>
          </div>
        </div>
        <div>
          <button className="btn btn-info">Info</button>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">
            Room Info :{" "}
            <span className="text-sm">
              {rooms?.RoomNumber?.length} Available
            </span>
          </p>
          <div>
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Room
            </button>
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
                  Room Number
                </th>
                <th className="py-4 px-6 text-base font-medium border-b text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms?.RoomNumber?.map((data: any, index: number) => (
                <tr key={data.id} className="hover:bg-gray-50 border-b transition duration-300">
                  <td className="py-4 px-6 border-b text-base font-medium">
                    {index + 1}
                  </td>

                  <td className="py-4 px-6 border-b text-base font-medium">
                    {data.number}
                  </td>

                  <td className="py-4 px-6  border-b text-end">
                    <Link
                      href={`/admin/manage-hotel/room-details/${data?.id}`}
                      className="bg-blue-500 mx-1 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() =>
                        document
                          .getElementById(`my_modal_${index}`)
                          .showModal()
                      }
                      className="bg-red-500 mx-1 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md"
                    >
                      Check
                    </button>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="bg-red-500 mx-1 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md"
                    >
                      Delete
                    </button>
                    <dialog id={`my_modal_${index}`} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() =>
                              document
                                .getElementById(`my_modal_${index}`)
                                .close()
                            }
                          >
                            ✕
                          </button>
                        </form>
                        <h3 className="font-bold text-lg">
                          Unavailable Dates:
                        </h3>
                        <DayPicker
                          mode="multiple"
                          disabled={[
                            ...data.unavailableDates.map(
                              (dateString: string) => new Date(dateString)
                            ),
                          ]}
                          onSelect={(dates) => setSelectedDates(dates || [])}
                        />
                      </div>
                    </dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Room : </h3>

          <div className="">
            <Form submitHandler={onSubmit}>
              <div className="flex gap-3">
                <div className="w-full">
                  <FormInput
                    name="number"
                    type="number"
                    placeholder="Room Number..."
                    label="Room Number"
                    className="w-full px-4 py-3 rounded border-2 
    hover:border-black
    focus:dark:border-violet-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className=" flex justify-center  py-2 px-10   text-sm font-medium rounded text-white  before:absolute before:inset-0 before:-z-10 before:bg-button  after:block hover:after:w-full after:w-0 after:hover:left-0 after:right-0 after:top-0 after:h-full after:-z-10 after:duration-300 after:bg-black after:absolute relative"
              >
                Submit
              </button>
            </Form>
          </div>
        </div>
      </dialog>

      <Alert />
    </div>
  );
};

export default RoomDetails;
