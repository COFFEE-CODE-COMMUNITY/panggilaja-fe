import React, { useEffect } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Button from "../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllServicesByIdSeller,
  getSellerById,
  selectSelectedSeller,
  selectSellerServices,
  selectSellerStatus,
  selectServiceSellerStatus,
} from "../../../features/sellerSlice";
import { selectCurrentUser } from "../../../features/authSlice";

const ProfileLayout = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const seller = useSelector(selectSelectedSeller);
  const status = useSelector(selectSellerStatus);
  const profile = useSelector(selectCurrentUser);
  const location = useLocation();

  const sellerService = useSelector(selectSellerServices);
  const sellerServiceStatus = useSelector(selectServiceSellerStatus);

  const isBuyer = profile?.active_role === "buyer";

  useEffect(() => {
    dispatch(getAllServicesByIdSeller(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(getSellerById(id));
    }
  }, [id, dispatch]);

<<<<<<< HEAD
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
=======
  const [isArtificialLoading, setIsArtificialLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsArtificialLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const ProfileSkeleton = () => (
    <div className={`flex flex-col h-full ${isBuyer ? "mt-20" : ''} animate-pulse`}>
      <div className={`xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] md:flex md:flex-row flex-col w-full h-full gap-[10px] md:gap-[20px] lg:gap-[30px] mx-auto`}>
        {/* Left Sidebar Skeleton */}
        <div className='md:h-full flex md:flex-col md:items-center lg:px-[15px] lg:py-[35px] md:px-[10px] md:py-[30px] px-[5px] sm:py-[25px] py-[15px] gap-[15px]'>
          <div className='bg-gray-200 lg:w-[110px] lg:h-[110px] md:w-[90px] md:h-[90px] w-[75px] h-[75px] rounded-full aspect-square' />
          <div className='md:text-center w-full flex flex-col items-center gap-2'>
            <div className='h-6 bg-gray-200 rounded w-32' />
            <div className='h-4 bg-gray-200 rounded w-48' />
          </div>
          <div className='hidden md:block h-10 bg-gray-200 rounded-lg lg:w-[220px] md:w-[180px] w-[100px]' />
          <div className='hidden md:flex flex-col gap-[10px] lg:w-[200px] md:w-[180px] w-[100px] mt-4'>
            <div className='h-5 bg-gray-200 rounded w-20' />
            <div className='flex flex-col gap-2'>
              <div className='h-8 bg-gray-200 rounded-[20px] w-24' />
              <div className='h-8 bg-gray-200 rounded-[20px] w-16' />
            </div>
          </div>
        </div>

        {/* Right Content Skeleton */}
        <div className='flex flex-col sm:w-5/7 w-full sm:my-0 my-[10px]'>
          <div className='w-full flex lg:gap-[40px] md:gap-[30px] gap-[20px] items-center lg:px-[30px] lg:py-[25px] px-[15px] py-[10px] md:mt-0 mt-6'>
            <div className='h-6 bg-gray-200 rounded w-20' />
            <div className='h-6 bg-gray-200 rounded w-20' />
            <div className='h-6 bg-gray-200 rounded w-20' />
            <div className='h-6 bg-gray-200 rounded w-20' />
          </div>
          <div className='p-4 space-y-4'>
            <div className='h-4 bg-gray-200 rounded w-full' />
            <div className='h-4 bg-gray-200 rounded w-3/4' />
            <div className='h-4 bg-gray-200 rounded w-5/6' />
            <div className='h-32 bg-gray-200 rounded w-full mt-4' />
          </div>
        </div>
      </div>
    </div>
  );

  if (status === 'loading' || isArtificialLoading) {
    return <ProfileSkeleton />
>>>>>>> 72dca7c321d4a3f7783e9cb5ad9d27adf49c66f2
  }



  if (status === "success") {
    // Use pengalaman field directly from seller data
    // The pengalaman field is a comma-separated string (e.g. "Mekanik, Teknisi Listrik")
    const skills = seller?.pengalaman
      ? seller.pengalaman
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
      : [];
    return (
      <div className={`flex flex-col h-full ${isBuyer ? "mt-20" : ""}`}>
        <div
          className={`${location.pathname.includes("manage-profile")
            ? "px-3"
            : "xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px]"
            } bg-white md:flex md:flex-row flex-col w-full h-full gap-[10px] md:gap-[20px] lg:gap-[30px] mx-auto`}
        >
          <div className="border-r-1 border-gray-100 md:h-full flex md:flex-col md:items-center lg:px-[15px] lg:py-[35px] md:px-[10px] md:py-[30px] px-[5px] sm:py-[25px] py-[15px] gap-[15px]">
            <img
              src={seller?.foto_toko}
              className="bg-gray-200 lg:w-[110px] lg:h-[110px] md:w-[90px] md:h-[90px] w-[75px] h-[75px] rounded-full aspect-square"
            />
            <div className="md:text-center w-full">
              <p className="lg:text-h3 md:text-h4 text-h5 font-medium w-full">
                {seller?.nama_toko}
              </p>
              <p className="md:text-h5 text-h6 font-light w-50">{`${seller?.address?.alamat}, ${seller?.address?.kecamatan}, ${seller?.address?.kota}, ${seller?.address?.provinsi}`}</p>
            </div>
            <Button
              variant="primary"
              className="md:block hidden md:text-h5 text-h6 text-white rounded-lg lg:w-[220px] md:w-[180px] w-[100px] py-[10px] text-center"
              to={`/chat/${seller?.id}`}
            >
              Kontak Saya
            </Button>
            <div className="md:flex hidden flex-col gap-[10px] lg:w-[200px] md:w-[180px] w-[100px]">
              <p className="text-left md:text=h5 text-h6">Ahli Dalam</p>
              <div className="w-full flex flex-col">
                {skills.map((skill) => (
                  <p className="px-[10px] py-[5px] border-2 border-gray-200 rounded-[20px] text-h6 w-fit">
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col md:hidden gap-[10px]">
              <div className="w-full">
                {skills.map((skill) => (
                  <p className="px-[10px] py-[5px] border-2 border-gray-200 rounded-[20px] text-h6 w-fit">
                    {skill}
                  </p>
                ))}
              </div>
              <Button
                variant="primary"
                className="md:text-h5 text-h6 text-white rounded-[40px] lg:w-[220px] md:w-[180px] py-[10px] w-full flex justify-center"
                to={`/chat/${seller?.id_seller}`}
              >
                Kontak Saya
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:w-5/7 w-full sm:my-0 my-[10px]">
            <div className="w-full flex lg:gap-[40px] md:gap-[30px] gap-[20px] md:text-h5 text-h6 items-center lg:px-[30px] lg:py-[25px] px-[15px] py-[10px] font-medium md:mt-0 mt-6">
              <NavLink
                to=""
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-black"
                }
              >
                Informasi
              </NavLink>

              <NavLink
                to="services"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-black"
                }
              >
                Jasa
              </NavLink>

              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-black"
                }
              >
                Ulasan
              </NavLink>

              <NavLink
                to="photos"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-black"
                }
              >
                Foto
              </NavLink>
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileLayout;
