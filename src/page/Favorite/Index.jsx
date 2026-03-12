import React from 'react'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import { FaRegHeart } from 'react-icons/fa'
import { useGetFavoriteServices, useGetServices } from '../../hooks/useServices'
import useAuthStore from '../../store/useAuthStore'

const FavoriteMobile = () => {
  const user = useAuthStore((state) => state.user);

  const { data: favoritesResponse, status: favoritesStatus } = useGetFavoriteServices(user?.id);
  const { data: servicesResponse } = useGetServices();

  const services = servicesResponse?.data || [];
  const favoritesData = favoritesResponse?.data || [];

  let favoritesService = [];

  if (favoritesStatus === "success" && favoritesData.length > 0 && services.length > 0) {
    const favoritedServiceIds = favoritesData.map((fav) => fav.service_id);

    favoritesService = services.filter((service) =>
      favoritedServiceIds.includes(service.id)
    );
  }

  return (
    <>
      {favoritesService.length < 1 && (
        <div className="p-8 text-center text-gray-500 mt-50">
          <FaRegHeart className="mx-auto text-4xl mb-2 text-gray-300" />
          <p className="text-h5">Belum ada favorit</p>
        </div>
      )}
      <div className='grid grid-cols-2 px-2 gap-3 min-h-screen w-full'>
        {favoritesService.map((favorite) => (
          <ServiceCard
            key={favorite.id}
            basePrice={favorite.base_price}
            topPrice={favorite.top_price}
            image={favorite.foto_product}
            sellerName={favorite.seller_name}
            idService={favorite.id}
            star={5}
            serviceName={favorite.nama_jasa}
            guest={false}
          />
        ))}
      </div>
    </>
  )
}

export default FavoriteMobile