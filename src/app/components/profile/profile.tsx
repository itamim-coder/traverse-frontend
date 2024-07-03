"use client";

import { useUserProfileQuery } from "@/redux/api/userApi";
import React from "react";
import EditProfile from "../ui/Modal/EditProfile/EditProfile";
import Loading from "../Loading";

const ProfilePage = () => {
  const { data: profileData, isLoading } = useUserProfileQuery(undefined);
  console.log(profileData);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="min-h-screen">
        <div className="m-5">
          <div className="flex justify-between">
            {/* <div></div> */}
            {profileData?.profileImg ? (
              <>
                <img
                  src={profileData?.profileImg}
                  alt=""
                  className="h-48  rounded-full object-cover"
                />
              </>
            ) : (
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                alt=""
                className="h-48  rounded-full object-cover"
              />
            )}

            <div>
              <button
                className="btn btn-outline btn-info"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Edit Info
              </button>
            </div>
          </div>
          <div className="divide-y">
            <p className="flex py-2">
              <span className="w-1/4">User Name</span>
              <span>: {profileData?.name}</span>
            </p>
            <p className="flex py-2">
              <span className="w-1/4">User Email</span>
              <span>: {profileData?.email}</span>
            </p>
            <p className="flex py-2">
              <span className="w-1/4">Contact No</span>
              <span>: {profileData?.contactNo}</span>
            </p>
            <p className="flex py-2">
              <span className="w-1/4">Address</span>
              <span>: {profileData?.address}</span>
            </p>
          </div>
        </div>
      </div>

      <EditProfile props={profileData} />
    </>
  );
};

export default ProfilePage;
