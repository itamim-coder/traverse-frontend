"use client";
import Form from "@/app/components/Forms/form";
import FormInput from "@/app/components/Forms/FormInput";
import { uploadImageToCloudinary } from "@/helpers/imgUpload/imgUpload";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Alert from "../../Alert/alert";

type FormValues = {
  name: string;
  contactNo: string;
  address: string;
  image: string;
};

const EditProfile = ({ props }) => {
  console.log("modal", props);
  const [showName, setShowName] = useState({});
  const [updateUser] = useUpdateUserMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    toast.loading("Updating....");

    try {
      if (showName.name) {
        const cloudinaryResponse = await uploadImageToCloudinary(showName);
        data.profileImg = cloudinaryResponse;
      }

      const res = await updateUser({ id: props?.id, updatedData: data });
      console.log(res);
      if (res) {
        toast.success("Updated Successfully");
      }
    } catch (err) {
      toast.error("failed");
      console.log(err);
    }
  };

  const defaultValues = {
    name: props?.name || "",
    contactNo: props?.contactNo || "",
    address: props?.address || "",
  };

  console.log("d", defaultValues);
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Update your information : </h3>

          <div className="">
            <Form submitHandler={onSubmit} defaultValues={defaultValues}>
              <div className="my-4">
                <label
                  className="flex justify-center w-2/5 items-end gap-4 rounded px-4 py-3 text-black border-2 hover:border-black"
                  htmlFor="file"
                >
                  <p className="text-normal font-medium text-center">
                    {showName.length > 0
                      ? `${showName.length} files selected`
                      : "Update Your Photo"}
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
              <div className="flex gap-3">
                <div className="w-full">
                  <FormInput
                    name="name"
                    type="text"
                    placeholder="Update Your Name..."
                    label="Your Name"
                    className="w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-full">
                  <FormInput
                    name="contactNo"
                    type="text"
                    placeholder="Update Your Contact No"
                    label="Contact No"
                    className="w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-full">
                  <FormInput
                    name="address"
                    type="text"
                    placeholder="Update Your Address"
                    label="Address"
                    className="w-full px-4 py-3 rounded border-2 
              hover:border-black
              focus:dark:border-violet-400"
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
        </div>
      </dialog>
      <Alert />
    </div>
  );
};

export default EditProfile;
