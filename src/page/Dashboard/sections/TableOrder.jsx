import React from 'react'

const TableOrder = () => {
  return (
    <div className='h-full'>
        <table className='w-full table-auto text-left'>
            <thead className='bg-gray-50'>
                <tr>
                    <th className='p-[10px]'>Jarak</th>
                    <th className='p-[10px]'>Pelanggan</th>
                    <th className='p-[10px]'>Status</th>
                    <th className='p-[10px]'>Harga</th>
                    <th className='p-[10px]'>Aksi</th>
                </tr>
            </thead>
            <tbody className='bg-gray-50/60'>
                <tr>
                    <td className='py-[15px] px-[10px]'>Pijat</td>
                    <td className='py-[15px] px-[10px]'>Sauki</td>
                    <td className='py-[15px] px-[10px]'>
                        <span className='px-[10px] py-[5px] border-2 border-primary text-primary rounded-[45px]'>Selesai</span>
                    </td>
                    <td className='py-[15px] px-[10px]'>
                        Rp. 50.000
                    </td>
                    <td className='py-[15px] px-[10px]'>
                        <p className='font-light'>Kirim Pesan</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default TableOrder