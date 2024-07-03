"use client";
import Alert from "@/app/components/ui/Alert/alert";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import React from "react";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const { data: users, isLoading } = useGetUsersQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const meta = users?.meta;

  const data = users?.data.result;
  console.log(data);

  //   const handleRoleChange = async (id: string, role: string) => {
  //     try {
  //       const res = await updateUser({ id, updatedData: { role } });
  //       console.log(res); // Update the tour availability
  //       toast.success("USER updated to ADMIN");
  //     } catch (error) {
  //       console.error("Error updating user:", error);
  //       toast.error("Failed to update user");
  //     }
  //   };
  const handleVerify = async (id: string, verified: boolean) => {
    try {
      await updateUser({ id, updatedData: { verified } }); // Update the tour availability
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error("Failed to update availability");
    }
  };
  const handleDelete = async (id: string) => {
    toast.loading("Deleting....");

    try {
      const res = await deleteUser(id).unwrap();
      console.log(res);
      if (res.id) {
        toast.success("Delete Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-5">
      <div>
        <p className="text-2xl font-semibold">
          User List : <span className="text-sm">{meta?.total} Available</span>
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {data?.map((data: any, index: number) => (
          <>
            <div className="card w-96 bg-base-100 border hover:shadow-xl ">
              <div className="avatar flex justify-center align-middle">
                <div className="w-24 mask mask-squircle  mt-5">
                  {data?.profileImg ? (
                    <img src={data.profileImg} />
                  ) : (
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  )}
                </div>
              </div>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{data?.name}</h2>
                <h2 className="">
                  Status:{" "}
                  {data?.verified ? (
                    <span className="text-green-500">Verified</span>
                  ) : (
                    <span className="text-red-500">Not Verified</span>
                  )}
                </h2>
                <div className="divider"></div>
                <div className="card-actions justify-between">
                  {/* <p>Admin</p>
                  <br />
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={data.role == "admin"}
                    onChange={() =>
                      handleRoleChange(
                        data.id,
                        data.role === "admin" ? "user" : "admin"
                      )
                    }
                  /> */}
                  <div className="flex-none">
                    <p className="text-sm">Verified</p>
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked={data.verified}
                      onChange={() => handleVerify(data.id, !data.verified)}
                    />
                  </div>

                  <button
                    className="btn btn-outline btn-error"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-primary">Details</button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      <Alert />
    </div>
  );
};

export default ManageUsers;
