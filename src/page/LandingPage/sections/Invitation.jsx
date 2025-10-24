import React from 'react'
import Card from '../../../components/common/Card'
import InvitationCard from '../../../components/modules/Cards/InvitationCard'
import Button from '../../../components/common/Button'
import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '../../../features/authSlice'

const Invitation = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-[20px] gap-[10px] w-full md:my-[100px] my-[50px]'>
        <InvitationCard>
            <h1 className='font-bold lg:text-h1 md:text-h2 text-h3 text-white w-3/4 lg:leading-14 md:leading-12 leading-8'>Saya Ingin Mencari Jasa Terbaik</h1>
            <p className='lg:text-h4 md:text-h5 text-h6 text-white h-full'>Temukan ahli di radius 3 KM Anda, lihat ulasan tepercaya, dan segera mulai negosiasi harga.</p>
            <div>
                <Link>
                    <Button variant='primary' className='text-white rounded-[25px] lg:h-[52px] md:h-[40px] h-[35px] lg:text-h4 md:text-h5 text-h6 flex justify-center items-center lg:px-[20px] lg:py-[15px] md:px-[15px] md:py-[10px] px-[10px] py-[5px]'>
                        Mulai cari jasa terdekat
                    </Button>
                </Link>
            </div>
        </InvitationCard>
        <InvitationCard>
            <h1 className='font-bold lg:text-h1 md:text-h2 text-h3 text-white w-full lg:leading-14 md:leading-12 leading-8'>Saya Ingin Menjadi Mitra & Berpenghasilan</h1>
            <p className='lg:text-h4 md:text-h5 text-h6 text-white h-full'>Ubah keahlian Anda menjadi penghasilan stabil. Proses pendaftaran mudah, GRATIS, dan sepenuhnya transparan.</p>
            <div>
                <Link to='partner'>
                    <Button variant='primary' className='text-white rounded-[25px] lg:h-[52px] md:h-[40px] h-[35px] lg:text-h4 md:text-h5 text-h6 flex justify-center items-center lg:px-[20px] lg:py-[15px] md:px-[15px] md:py-[10px] px-[10px] py-[5px]'>
                        Daftar & Raih Peluang GRATIS
                    </Button>
                </Link>
            </div>
        </InvitationCard>
    </div>
  )
}

export default Invitation