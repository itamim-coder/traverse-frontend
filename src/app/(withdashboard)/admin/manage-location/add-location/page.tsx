"use client";

import Form from "@/app/components/Forms/form";

import FormInput from "@/app/components/Forms/FormInput";
import Alert from "@/app/components/ui/Alert/alert";

import { uploadImageToCloudinary } from "@/helpers/imgUpload/imgUpload";
import { useCreateLocationMutation } from "@/redux/api/locationApi";

import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  image: string;
};
const AddLocation = () => {
  const [showName, setShowName] = useState({});
  const [addLocation] = useCreateLocationMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    console.log(data);
    toast.loading("Creating....");
    try {
      const cloudinaryResponse = await uploadImageToCloudinary(showName);
      console.log(cloudinaryResponse);
    
      data.image = cloudinaryResponse;
      const res = await addLocation(data);

      if (!!res) {
        toast.success("Added Successfully");
      }
    } catch (err) {
      toast.error("failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen  m-5">
      <p className="text-2xl font-semibold my-4">Add New Location</p>
      <div className="">
        <Form submitHandler={onSubmit}>
          <div>
            <FormInput
              name="name"
              type="text"
              placeholder="Location Name..."
              label="Add Location Name"
              className="lg:w-2/5 w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
            />
          </div>
          <div className="my-4">
            <div className="">
              <label
                className="flex justify-center w-2/5 items-end gap-4 rounded px-4 py-3 text-black border-2 hover:border-black"
                htmlFor="file"
              >
                <svg
                  width={30}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="Complete">
                      <g id="upload">
                        <g>
                          <path
                            d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7"
                            fill="none"
                            stroke="black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                          <g>
                            <polyline
                              data-name="Right"
                              fill="none"
                              id="Right-2"
                              points="7.9 6.7 12 2.7 16.1 6.7"
                              stroke="white"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></polyline>
                            <line
                              fill="none"
                              stroke="black"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              x1="12"
                              x2="12"
                              y1="16.3"
                              y2="4.8"
                            ></line>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <p className="text-lg font-medium text-center">
                  {" "}
                  {showName.name
                    ? showName.name.length > 15
                      ? `${showName.name.substring(0, 15)}...`
                      : showName.name
                    : "Upload"}
                </p>
              </label>
              <input
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const imageFile = e.target.files[0];
                    setShowName(imageFile);
                  }
                }}
                className="hidden"
                id="file"
                type="file"
              />
            </div>
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

export default AddLocation;
