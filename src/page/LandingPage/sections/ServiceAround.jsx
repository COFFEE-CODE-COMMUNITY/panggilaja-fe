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
    if(user?.id_buyer && token){
      dispatch(seeAddress(user.id_buyer))
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
                  <a href="#" className="group relative block overflow-hidden">
                    <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                      <span className="sr-only">Wishlist</span>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                      </svg>
                    </button>

                    <img src="https://images.unsplash.com/photo-1628202926206-c63a34b1618f?q=80&amp;w=2574&amp;auto=format&amp;fit=crop" alt="" className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"/>

                    <div className="relative border border-gray-100 bg-white p-6">
                      <p className="text-gray-700">
                        $49.99
                        <span className="text-gray-400 line-through">$80</span>
                      </p>

                      <h3 className="mt-1.5 text-lg font-medium text-gray-900">Wireless Headphones</h3>

                      <p className="mt-1.5 line-clamp-3 text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati
                        pariatur. Officiis qui, enim cupiditate aliquam corporis iste.
                      </p>

                      <form className="mt-4 flex gap-4">
                        <button className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
                          Add to Cart
                        </button>

                        <button type="button" className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105">
                          Buy Now
                        </button>
                      </form>
                    </div>
                  </a>
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
