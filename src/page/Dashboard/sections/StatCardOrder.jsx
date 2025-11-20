import React from 'react'
import { selectOrderSeller } from '../../../features/sellerSlice'
import { useSelector } from 'react-redux'

const StatCardOrder = () => {
  const orders = useSelector(selectOrderSeller)

  let lengthAllOrder = 0
  orders?.data?.map(() => {
    lengthAllOrder += 1
  })

  console.log(orders)

  let lengthProggressOrder = 0
  orders?.data?.map((order) => {
    if(order.status === 'in_progress'){
      lengthProggressOrder += 1
    }
  })

  let lengthDoneOrder = 0
  orders?.data?.map((order) => {
    if(order.status === 'completed'){
      lengthDoneOrder += 1
    }
  })
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <div className="flex justify-between w-full md:items-end">
          <div className="flex flex-col">
            <p className=" text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Total Pesanan
            </p>
            <p className="font-semibold text-xl md:text-3xl">
              {lengthAllOrder}
            </p>
          </div>
          <p className="text-gray-500 font-thin">+122</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <div className="flex justify-between w-full md:items-end">
          <div className="flex flex-col">
            <p className="text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Pesanan Diproses
            </p>
            <p className="font-semibold text-xl md:text-3xl">
              {lengthProggressOrder}
            </p>
          </div>
          <p className="text-gray-500 font-thin">-3.2%</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <div className="flex justify-between w-full md:items-end">
          <div className="flex flex-col">
            <p className="text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Pesanan Selesai
            </p>
            <p className="font-semibold text-xl md:text-3xl">
              {lengthDoneOrder}
            </p>
          </div>
          <p className="text-gray-500 font-thin">-3.2%</p>
        </div>
      </div>
    </div>
  )
}

export default StatCardOrder