import React from 'react'
import Card from '../../../components/common/Card'
import InvitationCard from '../../../components/modules/Cards/InvitationCard'
import Button from '../../../components/common/Button'
import { Link } from 'react-router-dom'

const Invitation = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-[20px] w-full my-[100px]'>
        <InvitationCard className=''>
            <h1 className='font-bold lg:text-h1 md:text-h2 text-h3 text-white w-3/4'>Saya Ingin Mencari Jasa Terbaik</h1>
            <p className='lg:text-h4 md:text-h5 text-h6 text-white'>Temukan ahli di radius 3 KM Anda, lihat ulasan tepercaya, dan segera mulai negosiasi harga.</p>
            <div>
                <Button variant='primary' className='text-white rounded-[25px] lg:h-[52px] h-[40px] lg:text-h4 md:text-h5 text-h6 flex justify-center items-center'>
                    Mulai cari jasa terdekat
                </Button>
            </div>
        </InvitationCard>
        <InvitationCard>
            <h1 className='font-bold lg:text-h1 md:text-h2 text-h3 text-white w-full'>Saya Ingin Menjadi Mitra & Berpenghasilan</h1>
            <p className='lg:text-h4 md:text-h5 text-h6 text-white'>Ubah keahlian Anda menjadi penghasilan stabil. Proses pendaftaran mudah, GRATIS, dan sepenuhnya transparan.</p>
            <div>
                <Link to='partner'>
                    <Button variant='primary' className='text-white rounded-[25px] lg:h-[52px] h-[40px] lg:text-h4 md:text-h5 text-h6 flex justify-center items-center'>
                        Daftar & Raih Peluang GRATIS
                    </Button>
                </Link>
            </div>
        </InvitationCard>
    </div>
  )
}

export default Invitation