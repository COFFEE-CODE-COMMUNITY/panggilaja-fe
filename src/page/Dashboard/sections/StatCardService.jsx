import React from 'react'

const StatCardService = () => {
  return (
    <div class="flex flex-col lg:flex-row gap-4 w-full">
      <div class="bg-white p-8 rounded-lg shadow-md w-full">
        <div class="flex justify-between w-full md:items-end">
          <div class="flex flex-col">
            <p class=" text-lg font-bold text-gray-500 mb-3 md:mb-6">
              Total Subscribers
            </p>
            <p class="font-semibold text-xl md:text-3xl">
              71,897
              <span class="text-gray-500 font-semibold text-base">
                from 70,946
              </span>
            </p>
          </div>
          <p class="text-gray-500 font-thin">+122</p>
        </div>
      </div>

      <div class="bg-white p-8 rounded-lg shadow-md w-full">
        <div class="flex justify-between w-full md:items-end">
          <div class="flex flex-col">
            <p class="font-bold text-lg text-gray-500 mb-3 md:mb-6">
              Avg. Open Rate
            </p>
            <p class="font-semibold text-xl md:text-3xl">
              58.16%
              <span class="text-gray-500 font-semibold text-base">
                from 56.14%
              </span>
            </p>
          </div>
          <p class="text-gray-500 font-thin">+5.4%</p>
        </div>
      </div>

      <div class="bg-white p-8 rounded-lg shadow-md w-full">
        <div class="flex justify-between w-full md:items-end">
          <div class="flex flex-col">
            <p class="text-lg font-bold text-gray-500 mb-3 md:mb-6">
              Avg. Click Rate
            </p>
            <p class="font-semibold text-xl md:text-3xl">
              24.57%
              <span class="text-gray-500 font-semibold text-base">
                from 28.62%
              </span>
            </p>
          </div>
          <p class="text-gray-500 font-thin">-3.2%</p>
        </div>
      </div>
    </div>
  )
}

export default StatCardService