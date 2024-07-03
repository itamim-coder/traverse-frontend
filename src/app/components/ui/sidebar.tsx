import { getUserInfo } from "@/app/services/auth.services";
import { SideBarItems } from "@/constants/sidebarItem";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SideBar = () => {
  const [userRole, setUserRole] = useState("");
  // const [isActive, setIsActive] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  // const handleToggle = (idx) => {
  //   setIsActive((prevIdx) => (prevIdx === idx ? null : idx));
  // };
  const handleAccordionToggle = (idx) => {
    setActiveAccordion((prevIdx) => (prevIdx === idx ? null : idx));
  };
  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);
  console.log("userRole", userRole);
  const menus = SideBarItems(userRole);

  return (
    <>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            TraVerse.
          </Link>
          {menus?.map((menu) => (
            <li key={menu.id} className="mb-2">
              {menu.submenus ? (
                <div
                  onClick={() => handleAccordionToggle(menu.id)}
                  className="cursor-pointer "
                >
                  <span className="text-base font-semibold hover:text-secondary flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="hsl(var(--s))"
                      viewBox="0 0 256 256"
                    >
                      <path d={menu.icon}></path>
                    </svg>
                    {menu.text}
                  </span>
                </div>
              ) : (
                <Link
                  href={menu.linkTo}
                  className="text-base font-semibold hover:text-secondary"
                >
                  <span className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="hsl(var(--s))"
                      viewBox="0 0 256 256"
                    >
                      <path d={menu.icon}></path>
                    </svg>
                    {menu.text}
                  </span>
                </Link>
              )}
              {activeAccordion === menu.id && (
                <ul
                  className={
                    activeAccordion === menu.id ? "submenu active" : "submenu"
                  }
                >
                  {menu.submenus.map((submenu) => (
                    <li key={submenu.id}>
                      <Link
                        href={submenu.linkTo}
                        className="text-base font-semibold hover:text-secondary"
                      >
                        {submenu.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
