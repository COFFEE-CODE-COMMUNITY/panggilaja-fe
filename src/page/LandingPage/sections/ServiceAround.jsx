import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getServices,
  getServicesAround,
  selectAllService,
  selectAllServiceStatus,
  selectServiceAround,
  selectServiceAroundError,
  selectServiceAroundStatus,
} from "../../../features/serviceSlice";
import ServiceCard from "../../../components/modules/Cards/ServiceCard";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBox } from "react-icons/fa";
import { selectAccessToken, selectCurrentUser } from "../../../features/authSlice";
import { seeAddress, selectSeeAddress } from "../../../features/userSlice";
import Stars from "../../../components/common/Stars";

const ServiceAround = () => {
  const dispatch = useDispatch();
  const services = useSelector(selectAllService);
  const servicesStatus = useSelector(selectAllServiceStatus);
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectAccessToken)
  const address = useSelector(selectSeeAddress)

  const servicesAround = useSelector(selectServiceAround)
  const servicesAroundStatus = useSelector(selectServiceAroundStatus)

  useEffect(() => {
    dispatch(getServices());
    if(user?.id && token){
      dispatch(seeAddress(user.id))
    }
  }, [dispatch]);

  useEffect(() => {
    if(address?.data?.kecamatan && user?.id){
      dispatch(getServicesAround({id : user.id, kecamatan : address?.data?.kecamatan}))
    }
  },[address?.data?.kecamatan])

  console.log(servicesAround)
  console.log(servicesAroundStatus)

  // Loading State
  if (servicesStatus === "loading") {
    return (
      <div className="w-full flex flex-col md:gap-[10px] gap-[5px] mt-8">
        <div className="flex items-center mb-4">
          <p className="xl:text-h4 text-h5 font-semibold flex-1">
            Jasa di sekitarmu
          </p>
        </div>
        <div className="grid lg:gap-[10px] md:gap-[7px] gap-[4px] w-full lg:grid-cols-4 grid-cols-2">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl animate-pulse"
              style={{ height: "320px" }}
            >
              <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (servicesStatus === "error") {
    return (
      <div className="w-full flex flex-col md:gap-[10px] gap-[5px] mt-8">
        <div className="flex items-center mb-4">
          <p className="xl:text-h4 text-h5 font-semibold flex-1">
            Jasa di sekitarmu
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-red-50 rounded-2xl border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-h5 font-semibold text-red-800 mb-2">
            Terjadi Kesalahan
          </p>
          <p className="text-h6 text-red-600 text-center mb-4">
            Gagal memuat data jasa. Silakan coba lagi.
          </p>
          <button
            onClick={() => dispatch(getServices())}
            className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const servicesSlice = services.slice(0, 8);

  // Success State
  if (servicesStatus === "success") {
    return (
      <div className="w-full flex flex-col md:gap-[10px] gap-[5px] mt-8 md:mt-12">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div>
            <p className="xl:text-h4 text-h5 font-semibold text-gray-800">
              Jasa di sekitarmu
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Temukan jasa terbaik di area Anda
            </p>
          </div>
          <Link to="all-service-result">
            <div className="group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300">
              <p className="xl:text-h5 text-h6 font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
                Lihat semua
              </p>
              <FaArrowRight className="text-gray-700 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 text-sm" />
            </div>
          </Link>
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaBox className="text-4xl text-gray-400" />
            </div>
            <p className="text-h5 font-semibold text-gray-700 mb-2">
              Belum Ada Jasa
            </p>
            <p className="text-h6 text-gray-500 text-center max-w-md">
              Saat ini belum ada jasa yang tersedia di area Anda. Silakan cek
              kembali nanti.
            </p>
          </div>
        )}

        {/* Services Grid */}
        {services.length > 0 && (
          // <div className="grid lg:gap-[10px] md:gap-[7px] gap-[4px] w-full lg:grid-cols-4 grid-cols-2">
          //   {servicesSlice.map((service, index) => (
          //     <div
          //       key={service.id}
          //       className="transition-all duration-300 hover:scale-[1.02]"
          //     >
                // <ServiceCard
                //   idService={service.id}
                //   image={service.foto_product}
                //   serviceName={service.nama_jasa}
                //   basePrice={service.base_price}
                //   topPrice={service.top_price}
                //   sellerName={service.seller.nama_toko}
                // />
          //     </div>
          //   ))}
          // </div>
          <>
            {address?.data?.kecamatan ? (
              <div className="grid gap-x-2 md:gap-x-3 lg:gap-x-4 gap-y-7 md:gap-y-8 lg:gap-y-9 sm:grid-cols-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-4 ">
                {servicesAround?.map((service, index) => (
                  <ServiceCard
                    key={index}
                    idService={service.id}
                    image={service.foto_product}
                    serviceName={service.nama_jasa}
                    basePrice={service.base_price}
                    topPrice={service.top_price}
                    star={4}
                  />
                ))}
              </div>
            ) : (
              <div className="grid gap-x-4 gap-y-9 sm:grid-cols-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-4 xl:gap-x-4">
                {servicesSlice?.map((service, index) => (
                  <ServiceCard
                    key={index}
                    idService={service.id}
                    image={service.foto_product}
                    serviceName={service.nama_jasa}
                    basePrice={service.base_price}
                    topPrice={service.top_price}
                    star={4}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  return null;
};

export default ServiceAround;
