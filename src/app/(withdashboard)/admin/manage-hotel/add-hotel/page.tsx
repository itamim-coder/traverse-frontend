"use client";
import Alert from "@/app/components/ui/Alert/alert";
import React, { useState } from "react";
import Form from "@/app/components/Forms/form";

import FormInput from "@/app/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useGetLocationQuery } from "@/redux/api/locationApi";
import { uploadImageToCloudinary } from "@/helpers/imgUpload/imgUpload";
import { useCreateHotelMutation } from "@/redux/api/hotelApi";
import toast from "react-hot-toast";

const AddHotel = () => {
  const [showName, setShowName] = useState({});
  const [location, setLocation] = useState("");
  console.log(location);
  console.log(showName);

  const { data: locations, isLoading } = useGetLocationQuery(undefined);
  const Locations = locations?.data.result;
  const [addHotel] = useCreateHotelMutation();
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.locationId = location;
    // console.log(data);
    if (
      !location ||
      !showName.length ||
      !data.name ||
      !data.address ||
      !data.cheapest_price
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    toast.loading("Creating....");
    try {
      const cloudinaryResponse = await uploadImageToCloudinary(showName);
      console.log(cloudinaryResponse);
      data.photos = cloudinaryResponse;
      const res = await addHotel(data);
      console.log(res);
      if (res?.data.id) {
        setShowName({});
        toast.success("Added Successfully");
      }
    } catch (err) {
      setShowName({});
      toast.error("failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen  m-5">
      <p className="text-2xl font-semibold my-4">Add New Hotel</p>
      <div className="">
        <Form submitHandler={onSubmit}>
       
            <div className="flex gap-2">
              <div className="w-full">
                <FormInput
                  require
                  name="name"
                  type="text"
                  placeholder="Hotel Name..."
                  label="Add Hotel Name"
                  className="w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
                />
              </div>
              <div className="w-full">
                {/* <label htmlFor="">Select City</label> */}
                <br />
                <select
                  required
                  className="select  select-bordered border-2 w-full "
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Select City</option>
                  {Locations?.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
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
                  : "Upload max 5 photos"}
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
                name="address"
                type="text"
                size="large"
                placeholder="Hotel Address..."
                label="Hotel Address"
                className="w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
              />
            </div>
            <div className="w-full">
              <FormInput
                require
                name="cheapest_price"
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

export default AddHotel;
