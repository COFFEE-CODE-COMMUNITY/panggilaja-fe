import React from 'react'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import { useSelector } from 'react-redux'
import { selectAllService, selectFavoriteService, selectFavoriteServiceStatus } from '../../features/serviceSlice'
import { FaRegHeart } from 'react-icons/fa'

const FavoriteMobile= () => {
  const favorites = useSelector(selectFavoriteService)
  const favoritesStatus = useSelector(selectFavoriteServiceStatus)

  const services = useSelector(selectAllService)

  let favoritesService = [];

  if (favoritesStatus === "success" && favorites.data && services.length > 0) {
    const favoritedServiceIds = favorites.data.map((fav) => fav.service_id);

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
      <div className='grid grid-cols-2 px-2 gap-3 h-screen w-full'>
        {favoritesService.map((favorite) => (
          <ServiceCard
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