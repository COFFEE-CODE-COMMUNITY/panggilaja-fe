import React from 'react'

const StatCardOrder = () => {
  return (
    <div class="grid md:grid-cols-4 grid-cols-2 gap-4 w-full">
      <div class="bg-white p-8 rounded-lg shadow-md w-full">
        <div class="flex justify-between w-full md:items-end">
          <div class="flex flex-col">
            <p class=" text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Total Pesanan
            </p>
            <p class="font-semibold text-xl md:text-3xl">
              0
            </p>
          </div>
          <p class="text-gray-500 font-thin">+122</p>
        </div>
      </div>

      <div class="bg-white p-8 rounded-lg shadow-md w-full">
        <div class="flex justify-between w-full md:items-end">
          <div class="flex flex-col">
            <p class="font-bold text-h5 text-gray-500 mb-3 md:mb-6">
              Pesanan Masuk
            </p>
            <p class="font-semibold text-xl md:text-3xl">
              0
            </p>
          </div>
          <p class="text-gray-500 font-thin">+5.4%</p>
        </div>
      </div>

      <div class="bg-white p-8 rounded-lg shadow-md w-full">
        <div class="flex justify-between w-full md:items-end">
          <div class="flex flex-col">
            <p class="text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Pesanan Diproses
            </p>
            <p class="font-semibold text-xl md:text-3xl">
              0
            </p>
          </div>
          <p class="text-gray-500 font-thin">-3.2%</p>
        </div>
      </div>

      <div class="bg-white p-8 rounded-lg shadow-md w-full">
        <div class="flex justify-between w-full md:items-end">
          <div class="flex flex-col">
            <p class="text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Pesanan Selesai
            </p>
            <p class="font-semibold text-xl md:text-3xl">
              0
            </p>
          </div>
          <p class="text-gray-500 font-thin">-3.2%</p>
        </div>
      </div>
    </div>
  )
}

export default StatCardOrder