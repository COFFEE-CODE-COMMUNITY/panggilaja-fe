import Button from '../../../components/common/Button'

const AfterRegistForm = ({handleSubmit}) => {
  return (
    <form className='flex flex-col gap-[15px] px-[15px]' onSubmit={handleSubmit}>
        <div className='flex items-center'>
            <label htmlFor='profil' className='w-[250px] font-light'>Unggah Profil</label>
            <div className='flex w-full gap-[10px] items-center'>
                <div className='w-[60px] h-[60px] rounded-full bg-amber-100'></div>
            </div>
        </div>
        <div className='flex items-center'>
            <label htmlFor="namaLengkap" className='w-[250px] font-light'>Nama Lengkap</label>
            <input name="namaLengkap" id="namaLengkap" placeholder='Masukkan nama lengkap' className='w-full bg-white p-[10px] rounded-[15px] border-2 border-gray-200'></input>
        </div>
        <div className='flex'>
            <label className='lg:text-h4 md:text-h5 text-h6 w-[250px] font-light'>Alamat</label>
            <div className='flex gap-[10px] w-full'>
                <select className='border-2 border-gray-200 px-[10px] py-[5px] rounded-[35px] bg-white'>
                    <option value="provinsi">Provinsi</option>
                </select>
                <select className='border-2 border-gray-200 px-[10px] py-[5px] rounded-[35px] bg-white'>
                    <option value="kota">Kota</option>
                </select>
                <select className='border-2 border-gray-200 px-[10px] py-[5px] rounded-[35px] bg-white'>
                    <option value="kecamatan">Kecamatan</option>
                </select>
                <select className='border-2 border-gray-200 px-[10px] py-[5px] rounded-[35px] bg-white'>
                    <option value="kelurahan">Kelurahan</option>
                </select>
            </div>
        </div>
        <div className='flex'>
            <label htmlFor="detailAddress" className='w-[250px] font-light'>Detail Alamat</label>
            <textarea name="detailAdress" id="detailAdress" placeholder='Masukkan detail alamat' className='w-full h-[150px] bg-white p-[10px] rounded-[15px] border-2 border-gray-200'></textarea>
        </div>
        <div className='w-full text-right'>
            <Button variant='primary' className='text-white px-[10px] py-[5px] rounded-[35px]'>Selesai</Button>
        </div>
    </form>
  )
}

export default AfterRegistForm