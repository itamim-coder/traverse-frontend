"use client";
import React, { useEffect, useState } from "react";
import SideBar from "../components/ui/sidebar";
import { isLoggedIn, removeUserInfo, token } from "../services/auth.services";
import { useRouter } from "next/navigation";
import NavBar from "../components/ui/navbar";
import { authKey } from "@/constants/storageKey";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // console.log("userlog", userLoggedIn);

  useEffect(() => {
    if (!isLoggedIn()) {
      // removeUserInfo(authKey);
      return router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading]);
  return (
    <>
      <html lang="en">
        <body>
          {/* <NavBar /> */}
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content overflow-x-hidden">
              {/* Page content here */}
              <div className="navbar bg-base-100">
                <div className="flex-1">
                  <label
                    htmlFor="my-drawer-2"
                    className="btn btn-ghost drawer-button lg:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="hsl(var(--n))"
                      viewBox="0 0 256 256"
                    >
                      <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
                    </svg>
                  </label>
                </div>
                <div className="flex-none gap-2">
                  <div className="avatar mr-2">
                    <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      {/* <UserButton afterSignOutUrl="/" /> */}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              {children}
            </div>
            <SideBar />
          </div>
        </body>
      </html>
    </>
  );
};

export default DashboardLayout;
