import React from 'react'

const TableAllOrder = () => {
  return (
    <div className="w-full border border-gray-400 rounded-lg overflow-x-auto">
    {/* Table */}
    <table className="w-full text-left">
        {/* Header */}
        <thead className="bg-primary text-white font-bold rounded-lg">
            <tr>
            <th className="p-4 w-[20%]">
                <div className="flex items-center gap-2 w-full">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
                Title 01
                <span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0.75V13.25M7 13.25L12.625 7.625M7 13.25L1.375 7.625" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
                </div>
            </th>
            <th className="px-4 py-3 w-[15%]">Title 02</th>
            <th className="px-4 py-3 w-[18%]">Title 03</th>
            <th className="px-4 py-3 w-[15%]">Title 04</th>
            <th className="px-4 py-3 w-[22%]">Title 01</th>
            <th className="px-4 py-3 w-[10%]"></th>
            </tr>
        </thead>
        {/* Body */}
        <tbody>
            <tr className="border-t border-gray-400">
            <td className="px-4 py-3  w-[20%]">
                <div className="flex items-center space-x-2 w-full">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
                <div className="bg-gray-100 rounded-full h-8 w-8"></div>
                <span>Placeholder</span>
                </div>
            </td>
            <td className="px-4 py-3 w-[15%]">
                <span className="bg-gray-100 px-3 py-3 rounded-md">
                Placeholder
                </span>
            </td>
            <td className="px-4 py-3 w-[18%]">Placeholder</td>
            <td className="px-4 py-3 w-[15%]">
                <div className="w-full flex items-center">
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>

                <span className="-ml-0.5 bg-gray-100 border border-white flex items-center justify-center rounded-full h-7 w-7 text-xs">
                    +5
                </span>
                </div>
            </td>
            <td className="px-4 py-3 w-[22%]">
                <div className="bg-gray-100 w-full h-1 rounded-full"></div>
            </td>
            <td className="px-4 py-3 w-[10%]">
                <div className=" flex w-full justify-end">
                <button className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5">
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                </button>
                </div>
            </td>
            </tr>
            <tr className="border-t border-gray-400">
            <td className="px-4 py-3  w-[20%]">
                <div className="flex items-center space-x-2 w-full">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
                <div className="bg-gray-100 rounded-full h-8 w-8"></div>
                <span>Placeholder</span>
                </div>
            </td>
            <td className="px-4 py-3 w-[15%]">
                <span className="bg-gray-100 px-3 py-3 rounded-md">
                Placeholder
                </span>
            </td>
            <td className="px-4 py-3 w-[18%]">Placeholder</td>
            <td className="px-4 py-3 w-[15%]">
                <div className="w-full flex items-center">
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <span className="-ml-0.5 bg-gray-100 border border-white flex items-center justify-center rounded-full h-7 w-7 text-xs">
                    +5
                </span>
                </div>
            </td>
            <td className="px-4 py-3 w-[22%]">
                <div className="bg-gray-100 w-full h-1 rounded-full"></div>
            </td>
            <td className="px-4 py-3 w-[10%]">
                <div className=" flex w-full justify-end">
                <button className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5">
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                </button>
                </div>
            </td>
            </tr>
            <tr className="border-t border-gray-400">
            <td className="px-4 py-3  w-[20%]">
                <div className="flex items-center space-x-2 w-full">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
                <div className="bg-gray-100 rounded-full h-8 w-8"></div>
                <span>Placeholder</span>
                </div>
            </td>
            <td className="px-4 py-3 w-[15%]">
                <span className="bg-gray-100 px-3 py-3 rounded-md">
                Placeholder
                </span>
            </td>
            <td className="px-4 py-3 w-[18%]">Placeholder</td>
            <td className="px-4 py-3 w-[15%]">
                <div className="w-full flex items-center">
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <span className="-ml-0.5 bg-gray-100 border border-white flex items-center justify-center rounded-full h-7 w-7 text-xs">
                    +5
                </span>
                </div>
            </td>
            <td className="px-4 py-3 w-[22%]">
                <div className="bg-gray-100 w-full h-1 rounded-full"></div>
            </td>
            <td className="px-4 py-3 w-[10%]">
                <div className=" flex w-full justify-end">
                <button className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5">
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                </button>
                </div>
            </td>
            </tr>
            <tr className="border-t border-gray-400">
            <td className="px-4 py-3  w-[20%]">
                <div className="flex items-center space-x-2 w-full">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
                <div className="bg-gray-100 rounded-full h-8 w-8"></div>
                <span>Placeholder</span>
                </div>
            </td>
            <td className="px-4 py-3 w-[15%]">
                <span className="bg-gray-100 px-3 py-3 rounded-md">
                Placeholder
                </span>
            </td>
            <td className="px-4 py-3 w-[18%]">Placeholder</td>
            <td className="px-4 py-3 w-[15%]">
                <div className="w-full flex items-center">
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <span className="-ml-0.5 bg-gray-100 border border-white flex items-center justify-center rounded-full h-7 w-7 text-xs">
                    +5
                </span>
                </div>
            </td>
            <td className="px-4 py-3 w-[22%]">
                <div className="bg-gray-100 w-full h-1 rounded-full"></div>
            </td>
            <td className="px-4 py-3 w-[10%]">
                <div className=" flex w-full justify-end">
                <button className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5">
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                </button>
                </div>
            </td>
            </tr>
            <tr className="border-t border-gray-400">
            <td className="px-4 py-3  w-[20%]">
                <div className="flex items-center space-x-2 w-full">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
                <div className="bg-gray-100 rounded-full h-8 w-8"></div>
                <span>Placeholder</span>
                </div>
            </td>
            <td className="px-4 py-3 w-[15%]">
                <span className="bg-gray-100 px-3 py-3 rounded-md">
                Placeholder
                </span>
            </td>
            <td className="px-4 py-3 w-[18%]">Placeholder</td>
            <td className="px-4 py-3 w-[15%]">
                <div className="w-full flex items-center">
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <span className="-ml-0.5 bg-gray-100 border border-white flex items-center justify-center rounded-full h-7 w-7 text-xs">
                    +5
                </span>
                </div>
            </td>
            <td className="px-4 py-3 w-[22%]">
                <div className="bg-gray-100 w-full h-1 rounded-full"></div>
            </td>
            <td className="px-4 py-3 w-[10%]">
                <div className=" flex w-full justify-end">
                <button className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5">
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                </button>
                </div>
            </td>
            </tr>
            <tr className="border-t border-gray-400">
            <td className="px-4 py-3  w-[20%]">
                <div className="flex items-center space-x-2 w-full">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
                <div className="bg-gray-100 rounded-full h-8 w-8"></div>
                <span>Placeholder</span>
                </div>
            </td>
            <td className="px-4 py-3 w-[15%]">
                <span className="bg-gray-100 px-3 py-3 rounded-md">
                Placeholder
                </span>
            </td>
            <td className="px-4 py-3 w-[18%]">Placeholder</td>
            <td className="px-4 py-3 w-[15%]">
                <div className="w-full flex items-center">
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <span className="-ml-0.5 bg-gray-100 border border-white flex items-center justify-center rounded-full h-7 w-7 text-xs">
                    +5
                </span>
                </div>
            </td>
            <td className="px-4 py-3 w-[22%]">
                <div className="bg-gray-100 w-full h-1 rounded-full"></div>
            </td>
            <td className="px-4 py-3 w-[10%]">
                <div className=" flex w-full justify-end">
                <button className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5">
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                </button>
                </div>
            </td>
            </tr>
            <tr className="border-t border-gray-400">
            <td className="px-4 py-3  w-[20%]">
                <div className="flex items-center space-x-2 w-full">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
                <div className="bg-gray-100 rounded-full h-8 w-8"></div>
                <span>Placeholder</span>
                </div>
            </td>
            <td className="px-4 py-3 w-[15%]">
                <span className="bg-gray-100 px-3 py-3 rounded-md">
                Placeholder
                </span>
            </td>
            <td className="px-4 py-3 w-[18%]">Placeholder</td>
            <td className="px-4 py-3 w-[15%]">
                <div className="w-full flex items-center">
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <span className="-ml-0.5 bg-gray-100 border border-white flex items-center justify-center rounded-full h-7 w-7 text-xs">
                    +5
                </span>
                </div>
            </td>
            <td className="px-4 py-3 w-[22%]">
                <div className="bg-gray-100 w-full h-1 rounded-full"></div>
            </td>
            <td className="px-4 py-3 w-[10%]">
                <div className=" flex w-full justify-end">
                <button className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5">
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                </button>
                </div>
            </td>
            </tr>
            <tr className="border-t border-gray-400">
            <td className="px-4 py-3  w-[20%]">
                <div className="flex items-center space-x-2 w-full">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
                <div className="bg-gray-100 rounded-full h-8 w-8"></div>
                <span>Placeholder</span>
                </div>
            </td>
            <td className="px-4 py-3 w-[15%]">
                <span className="bg-gray-100 px-3 py-3 rounded-md">
                Placeholder
                </span>
            </td>
            <td className="px-4 py-3 w-[18%]">Placeholder</td>
            <td className="px-4 py-3 w-[15%]">
                <div className="w-full flex items-center">
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <span className="-ml-0.5 bg-gray-100 border border-white flex items-center justify-center rounded-full h-7 w-7 text-xs">
                    +5
                </span>
                </div>
            </td>
            <td className="px-4 py-3 w-[22%]">
                <div className="bg-gray-100 w-full h-1 rounded-full"></div>
            </td>
            <td className="px-4 py-3 w-[10%]">
                <div className=" flex w-full justify-end">
                <button className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5">
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                </button>
                </div>
            </td>
            </tr>
            <tr className="border-t border-gray-400">
            <td className="px-4 py-3  w-[20%]">
                <div className="flex items-center space-x-2 w-full">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
                <div className="bg-gray-100 rounded-full h-8 w-8"></div>
                <span>Placeholder</span>
                </div>
            </td>
            <td className="px-4 py-3 w-[15%]">
                <span className="bg-gray-100 px-3 py-3 rounded-md">
                Placeholder
                </span>
            </td>
            <td className="px-4 py-3 w-[18%]">Placeholder</td>
            <td className="px-4 py-3 w-[15%]">
                <div className="w-full flex items-center">
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                <span className="-ml-0.5 bg-gray-100 border border-white flex items-center justify-center rounded-full h-7 w-7 text-xs">
                    +5
                </span>
                </div>
            </td>
            <td className="px-4 py-3 w-[22%]">
                <div className="bg-gray-100 w-full h-1 rounded-full"></div>
            </td>
            <td className="px-4 py-3 w-[10%]">
                <div className=" flex w-full justify-end">
                <button className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5">
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                </button>
                </div>
            </td>
            </tr>
        </tbody>
    </table>
    <div className="flex justify-between items-center p-4 border-t border-gray-400 w-full">
        <button className="bg-white font-bold border border-gray-400 md:px-4 md:py-3 p-2 rounded-md hover:border-gray-100">
            Previous
        </button>
        <span className="px-2">Page 1 of 10</span>
        <button className="bg-white font-bold border border-gray-400 md:px-4 md:py-3 p-2 rounded-md hover:border-gray-100">
            Next
        </button>
    </div>
</div>
  )
}

export default TableAllOrder