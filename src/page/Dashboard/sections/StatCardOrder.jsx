import React, { useEffect, useState } from 'react'
import { selectOrderSeller, selectOrderSellerStatus } from '../../../features/sellerSlice'
import { useSelector } from 'react-redux'

const StatCardOrder = () => {
  const orders = useSelector(selectOrderSeller)
  const status = useSelector(selectOrderSellerStatus)

  const [isArtificialLoading, setIsArtificialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsArtificialLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  let lengthAllOrder = 0
  orders?.data?.map(() => {
    lengthAllOrder += 1
  })

  let lengthProggressOrder = 0
  orders?.data?.map((order) => {
    if (order.status === 'in_progress' || order.status === 'proses') {
      lengthProggressOrder += 1
    }
  })

  let lengthDoneOrder = 0
  orders?.data?.map((order) => {
    if (order.status === 'completed' || order.status === 'selesai') {
      lengthDoneOrder += 1
    }
  })

  if (status === 'loading' || isArtificialLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white lg:p-8 md:p-6 p-4 rounded-lg shadow-md w-full animate-pulse">
            <div className="flex justify-between w-full md:items-end">
              <div className="flex flex-col w-full">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-3 md:mb-6"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <div className="bg-white lg:p-8 md:p-6 p-4 rounded-lg shadow-md w-full">
        <div className="flex justify-between w-full md:items-end">
          <div className="flex flex-col">
            <p className=" text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Total Pesanan
            </p>
            <p className="font-semibold text-xl md:text-3xl">
              {lengthAllOrder}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white lg:p-8 md:p-6 p-4 rounded-lg shadow-md w-full">
        <div className="flex justify-between w-full md:items-end">
          <div className="flex flex-col">
            <p className="text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Pesanan Diproses
            </p>
            <p className="font-semibold text-xl md:text-3xl">
              {lengthProggressOrder}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white lg:p-8 md:p-6 p-4 rounded-lg shadow-md w-full">
        <div className="flex justify-between w-full md:items-end">
          <div className="flex flex-col">
            <p className="text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Pesanan Selesai
            </p>
            <p className="font-semibold text-xl md:text-3xl">
              {lengthDoneOrder}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatCardOrder