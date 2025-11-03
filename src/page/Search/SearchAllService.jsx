import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService, selectAllServiceError, selectAllServiceStatus } from '../../features/serviceSlice'
import ServiceCard from '../../components/modules/Cards/ServiceCard'

const SearchAllService = () => {
  const dispatch = useDispatch()
  
  const allServices = useSelector(selectAllService)
  const status = useSelector(selectAllServiceStatus)
  const error = useSelector(selectAllServiceError)

  useEffect(() => {
      if (status === 'idle' && !allServices) {
          dispatch(getServices()) 
      }
  }, [status, dispatch])

  
  if (status === 'loading') {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                <p className='mt-4 text-gray-600'>Memuat data...</p>
            </div>
        </div>
    )
  }
  
  if (status === 'failed') {
      return (
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center'>
          <p className='text-h3 font-medium'>
            Failed to search, something happened
          </p>
        </div>
      )
  }

  return (
      <div className='min-h-screen px-[20px] py-[15px] flex flex-col gap-[15px] max-w-8xl mx-auto'>
          {/* <div className='grid lg:grid-cols-4 grid-cols-2 gap-[10px]'>
              {allServices.map((service) => (
                  <ServiceCard
                      idService={service.id}
                      image={service.foto_product}
                      serviceName={service.nama_jasa}
                      key={service.id}
                      basePrice={service.base_price}
                      topPrice={service.top_price}
                  />
              ))}
          </div> */}
        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
            <a href="#" class="group">
                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                <h3 class="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">$48</p>
            </a>
            <a href="#" class="group">
                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg" alt="Olive drab green insulated bottle with flared screw lid and flat top." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                <h3 class="mt-4 text-sm text-gray-700">Nomad Tumbler</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">$35</p>
            </a>
            <a href="#" class="group">
                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg" alt="Person using a pen to cross a task off a productivity paper card." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                <h3 class="mt-4 text-sm text-gray-700">Focus Paper Refill</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">$89</p>
            </a>
            <a href="#" class="group">
                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg" alt="Hand holding black machined steel mechanical pencil with brass tip and top." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                <h3 class="mt-4 text-sm text-gray-700">Machined Mechanical Pencil</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">$35</p>
            </a>
            <a href="#" class="group">
                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg" alt="Paper card sitting upright in walnut card holder on desk." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                <h3 class="mt-4 text-sm text-gray-700">Focus Card Tray</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">$64</p>
            </a>
            <a href="#" class="group">
                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg" alt="Stack of 3 small drab green cardboard paper card refill boxes with white text." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                <h3 class="mt-4 text-sm text-gray-700">Focus Multi-Pack</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">$39</p>
            </a>
            <a href="#" class="group">
                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg" alt="Brass scissors with geometric design, black steel finger holes, and included upright brass stand." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                <h3 class="mt-4 text-sm text-gray-700">Brass Scissors</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">$50</p>
            </a>
            <a href="#" class="group">
                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg" alt="Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop." class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                <h3 class="mt-4 text-sm text-gray-700">Focus Carry Pouch</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">$32</p>
            </a>
        </div>
      </div>
  )
}

export default SearchAllService