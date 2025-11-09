import React from "react";
import StatCardOrder from "./sections/StatCardOrder";
import { NavLink, Outlet } from "react-router-dom";

const ManageOrderLayout = () => {
  return (
    <div className="w-full px-[15px] flex flex-col gap-[10px]">
      <div className="h-full flex flex-col max-w-7xl gap-10">
        <StatCardOrder />
        <div>
          <ul className="flex gap-5">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `px-3 py-2 cursor-pointer transition-colors duration-300
                            ${
                              isActive
                                ? "border-primary border-b-2 text-primary"
                                : "text-gray-500 hover:border-b-2 hover:border-primary hover:text-primary"
                            }`
                }
                end={true}
                to="."
              >
                Semua Pesanan
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `px-3 py-2 cursor-pointer transition-colors duration-300
                            ${
                              isActive
                                ? "border-primary border-b-2 text-primary"
                                : "text-gray-500 hover:border-b-2 hover:border-primary hover:text-primary"
                            }`
                }
                to={`incoming-order`}
              >
                Pesanan Masuk
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `px-3 py-2 cursor-pointer transition-colors duration-300
                            ${
                              isActive
                                ? "border-primary border-b-2 text-primary"
                                : "text-gray-500 hover:border-b-2 hover:border-primary hover:text-primary"
                            }`
                }
                to={`process-order`}
              >
                Pesanan Diproses
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `px-3 py-2 cursor-pointer transition-colors duration-300
                            ${
                              isActive
                                ? "border-primary border-b-2 text-primary"
                                : "text-gray-500 hover:border-b-2 hover:border-primary hover:text-primary"
                            }`
                }
                to={`done-order`}
              >
                Pesanan Selesai
              </NavLink>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageOrderLayout;
