"use client";
import Alert from "@/app/components/ui/Alert/alert";
import React, { useState } from "react";
import Form from "@/app/components/Forms/form";

import FormInput from "@/app/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";

import { uploadImageToCloudinary } from "@/helpers/imgUpload/imgUpload";
import { useGetHotelsQuery } from "@/redux/api/hotelApi";
import toast from "react-hot-toast";
import { useCreateRoomMutation } from "@/redux/api/roomApi";

const CreateRoomCategory = ({ params }) => {
  console.log("room category", params);
  const query: Record<string, any> = {};
  const [showName, setShowName] = useState({});
  const [hotelId, setHotelId] = useState("");

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  const { data: hotels, isLoading } = useGetHotelsQuery({ ...query });
  console.log(hotels);
  const Hotels = hotels?.data.result;
  const [CreateRoom] = useCreateRoomMutation();
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.hotelId = params?.id;
    console.log(data);
    if (!showName.length || !data.name || !data.maxPeople || !data.price) {
      toast.error("Please fill in all the fields.");
      return;
    }

    toast.loading("Creating....");
    try {
      const cloudinaryResponse = await uploadImageToCloudinary(showName);
      console.log(cloudinaryResponse);
      data.photos = cloudinaryResponse;
      const res = await CreateRoom(data);
      console.log(res);
      if (res?.data.id) {
        setShowName({});
        toast.success("Room Created Successfully");
      }
    } catch (err) {
      setShowName({});
      toast.error("failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen  m-5">
      <p className="text-2xl font-semibold my-4">Create Room Category</p>
      <div className="">
        <Form submitHandler={onSubmit}>
          <div className="flex">
            <div className="w-full flex gap-2">
              <div className="w-full">
                <FormInput
                  require
                  name="name"
                  type="text"
                  placeholder="Ex : Deluxe Hill View"
                  label="Room Type"
                  className="w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
                />
              </div>
              <div className="w-full">
                {/* <label htmlFor="">Select City</label> */}
                <br />
                {/* <select
                  required
                  className="select  select-bordered border-2 w-full "
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  <option value="">Select Hotel</option>
                  {Hotels?.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </option>
                  ))}
                </select> */}
              </div>
            </div>
          </div>

          <div className="my-4">
            <label
              className="flex justify-center w-2/5 items-end gap-4 rounded px-4 py-3 text-black border-2 hover:border-black"
              htmlFor="file"
            >
              <p className="text-normal font-medium text-center">
                {showName.length > 0
                  ? `${showName.length} files selected`
                  : "Upload max 3 photos"}
              </p>
            </label>
            <input
              required
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const imageFiles = Array.from(e.target.files);
                  setShowName(imageFiles);
                }
              }}
              className="hidden"
              id="file"
              type="file"
              multiple
            />
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <FormInput
                require
                name="maxPeople"
                type="number"
                size="large"
                placeholder="1 / 2"
                label="Max People"
                className="w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
              />
            </div>
            <div className="w-full">
              <FormInput
                require
                name="price"
                type="number"
                placeholder="Cheapest Room Price..."
                label="Cheapest Room Price"
                className=" w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
              />
            </div>
          </div>
          <button
            type="submit"
            className=" flex justify-center mt-2 py-2 px-10   text-sm font-medium rounded text-white  before:absolute before:inset-0 before:-z-10 before:bg-button text-white after:block hover:after:w-full after:w-0 after:hover:left-0 after:right-0 after:top-0 after:h-full after:-z-10 after:duration-300 after:bg-black after:absolute relative inline-block"
          >
            Submit
          </button>
        </Form>
      </div>
      <Alert />
    </div>
  );
};

export default CreateRoomCategory;
