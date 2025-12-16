import { useDispatch, useSelector } from "react-redux";
import StatCardOrder from "./sections/StatCardOrder";
import { NavLink, Outlet } from "react-router-dom";
import { seeProfile, selectSeeProfile } from "../../features/userSlice";
import { useEffect, useState } from "react";

const ManageOrderLayout = () => {
  const [isArtificialLoading, setIsArtificialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsArtificialLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full px-[15px] flex flex-col gap-[10px] min-h-screen sm:mb-20">
      <div className="h-full flex flex-col w-full xl:gap-8 lg:gap-7 md:gap-5 gap-3">
        <StatCardOrder />
        <div>
          {isArtificialLoading ? (
            <div className="flex justify-start lg:gap-5 md:gap-4 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <ul className="flex justify-start lg:gap-5 md:gap-4 gap-3">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `lg:px-3 py-2 cursor-pointer transition-colors duration-300 sm:text-h5 text-h6
                              ${isActive
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
                    `px-3 py-2 cursor-pointer transition-colors duration-300 sm:text-h5 text-h6
                              ${isActive
                      ? "border-primary border-b-2 text-primary"
                      : "text-gray-500 hover:border-b-2 hover:border-primary hover:text-primary"
                    }`
                  }
                  to={`process-order`}
                >
                  Diproses
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `px-3 py-2 cursor-pointer transition-colors duration-300 sm:text-h5 text-h6
                              ${isActive
                      ? "border-primary border-b-2 text-primary"
                      : "text-gray-500 hover:border-b-2 hover:border-primary hover:text-primary"
                    }`
                  }
                  to={`done-order`}
                >
                  Selesai
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageOrderLayout;
