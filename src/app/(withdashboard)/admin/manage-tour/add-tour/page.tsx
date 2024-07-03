"use client";
import { DayPicker } from "react-day-picker";
import Form from "@/app/components/Forms/form";
import { format } from "date-fns";
import FormInput from "@/app/components/Forms/FormInput";
import Alert from "@/app/components/ui/Alert/alert";

import { uploadImageToCloudinary } from "@/helpers/imgUpload/imgUpload";
import {
  useCreateLocationMutation,
  useGetLocationQuery,
} from "@/redux/api/locationApi";

import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateTourMutation } from "@/redux/api/tourApi";
const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid oklch(var(--p));
    color: oklch(var(--p));
  }
  .my-selected:hover:not([disabled]) { 
    border-color: oklch(var(--p));
    color: oklch(var(--p));
  }
  .my-today { 
    font-weight: semibold;
    font-size: 120%; 
    color: oklch(var(--p));
  }
`;
type FormValues = {
  name: string;
  image: string;
};
const AddTour = () => {
  const [showName, setShowName] = useState({});
  const [location, setLocation] = useState("");
  const initialDays: Date[] = [];

  const [selected, setSelected] = useState<Date>();
  const [formattedSelected, setFormattedSelected] = useState<
    string | undefined
  >();
  const { data: locations, isLoading } = useGetLocationQuery(undefined);
  const Locations = locations?.data.result;
  // console.log(selected);

  let footer = <p className="mb-3">Please pick a day.</p>;
  if (selected) {
    footer = (
      <p className="mb-3">
        {" "}
        You picked{" "}
        <span className="text-primary font-bold">{format(selected, "PP")}</span>
        .
      </p>
    );
  }
  useEffect(() => {
    if (selected) {
      const formattedDate = format(selected, "MM/dd/yyyy");
      setFormattedSelected(formattedDate);
    } else {
      setFormattedSelected(undefined);
    }
  }, [selected]);

  const [createTour] = useCreateTourMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    data.locationId = location;
    data.starting_date = formattedSelected;
    console.log(data);
    toast.loading("Creating....");
    try {
      const cloudinaryResponse = await uploadImageToCloudinary(showName);
      console.log(cloudinaryResponse);

      data.images = cloudinaryResponse;
      const res = await createTour(data);

      if (res?.id) {
        toast.success("Added Successfully");
      }
    } catch (err) {
      toast.error("failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen  m-5">
      <p className="text-2xl font-semibold my-4">Add Tour Package</p>
      <div className="">
        <Form submitHandler={onSubmit}>
          <div className="flex gap-3">
            <div className="w-full">
              <FormInput
                name="title"
                type="text"
                placeholder="Package Name..."
                label="Tour Package Name"
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
                className="select  select-bordered border-2 w-full hover:border-black"
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
          <div className="flex gap-3">
            <div className="w-full">
              <FormInput
                name="duration"
                type="number"
                placeholder="Days..."
                label="Tour Duration"
                className="w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
              />
            </div>
            <div className="w-full">
              <FormInput
                name="departure"
                type="text"
                placeholder="Starts From..."
                label="Tour Starts From"
                className="w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-full">
              <style>{css}</style>
              <p className="text-sm  font-medium text-gray-700">Tour Date</p>
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                modifiersClassNames={{
                  selected: "my-selected",
                  today: "my-today",
                }}
                modifiersStyles={{
                  disabled: { fontSize: "75%" },
                }}
                footer={footer}
              />
            </div>
            <div className="w-full">
              <FormInput
                name="price"
                type="number"
                placeholder="Amount..."
                label="Tour Budget"
                className="w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
              />
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

          {/* <button
            type="submit"
            className="  flex justify-center py-2 px-10 border  text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button> */}
          <button
            type="submit"
            className=" flex justify-center  py-2 px-10   text-sm font-medium rounded text-white  before:absolute before:inset-0 before:-z-10 before:bg-button text-white after:block hover:after:w-full after:w-0 after:hover:left-0 after:right-0 after:top-0 after:h-full after:-z-10 after:duration-300 after:bg-black after:absolute relative inline-block"
          >
            Submit
          </button>
        </Form>
      </div>
      <Alert />
    </div>
  );
};

export default AddTour;
