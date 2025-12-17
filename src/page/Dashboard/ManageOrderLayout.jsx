import { useDispatch, useSelector } from "react-redux";
// import StatCardOrder from "./sections/StatCardOrder";
import { NavLink, Outlet } from "react-router-dom";
import { seeProfile, selectSeeProfile } from "../../features/userSlice";
import { useEffect, useState } from "react";
import Input from "../../components/common/Input";
import { FaSearch } from "react-icons/fa";

const ManageOrderLayout = () => {
  const [isArtificialLoading, setIsArtificialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsArtificialLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full px-[15px] lg:py-[10px] md:py-[5px] py-[5px] flex flex-col gap-[10px] min-h-screen sm:mb-20">
      <div className="h-full flex flex-col w-full xl:gap-8 lg:gap-7 md:gap-5 gap-3">
        {/* <StatCardOrder /> */}
        {/* Search Bar - Consistent with Chat & Services */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Cari pesanan..."
            className="bg-gray-50/50 w-full rounded-xl pl-10 pr-4 py-2.5 border border-gray-100 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
        <Outlet context={{ searchQuery }} />
      </div>
    </div>
  );
};

export default ManageOrderLayout;
