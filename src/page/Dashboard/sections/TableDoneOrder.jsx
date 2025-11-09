import React from 'react'

const TableDoneOrder = () => {
  return (
    <div className="w-full border border-gray-400 rounded-lg overflow-x-auto">
    {/* Table */}
    <table className="w-full text-left">
        {/* Header */}
        <thead className="bg-primary text-white font-bold rounded-lg">
            <tr>
                <th className="p-4 w-[20%]">Nama Pemesan</th>
                <th className="px-4 py-3 w-[15%]">Jasa</th>
                <th className="px-4 py-3 w-[18%]">Tanggal</th>
                <th className="px-4 py-3 w-[10%]">Aksi</th>
            </tr>
        </thead>
        {/* Body */}
        <tbody>
            {/* <tr className="border-t border-gray-400">
            <td className="px-4 py-3  w-[20%]">
                <div className="flex items-center space-x-2 w-full">
                <input type="checkbox" className="w-5 h-5 rounded-lg" />
                <div className="bg-gray-100 rounded-full h-8 w-8"></div>
                </div>
            </td>
            <td className="px-4 py-3 w-[15%]">
            </td>
            <td className="px-4 py-3 w-[18%]">Placeholder</td>
            <td className="px-4 py-3 w-[10%]">
                <div className=" flex w-full justify-end">
                <button className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5">
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                    <span className="bg-black h-1 w-1 rounded-full"></span>
                </button>
                </div>
            </td>
            </tr> */}
        </tbody>
    </table>
</div>
  )
}

export default TableDoneOrder