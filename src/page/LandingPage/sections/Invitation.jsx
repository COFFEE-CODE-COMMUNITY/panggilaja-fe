import InvitationCard from '../../../components/modules/Cards/InvitationCard'
import Button from '../../../components/common/Button'
import { Link } from 'react-router-dom'

const Invitation = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-[20px] gap-[10px] w-full md:my-[100px] my-[50px]'>
        <InvitationCard className='gap-[10px]'>
            <div>
                <h1 className='font-bold lg:text-h1 md:text-h2 text-h3 text-white w-3/4'>Saya Ingin Mencari Jasa Terbaik</h1>
                <p className='lg:text-h4 md:text-h5 text-h6 text-white h-full'>Temukan ahli di radius 3 KM Anda, lihat ulasan tepercaya, dan segera mulai negosiasi harga.</p>
            </div>
            <Link>
                <Button variant='primary' className='text-white rounded-[25px] lg:h-[52px] md:h-[40px] h-[35px] lg:text-h4 md:text-h5 text-h6 flex justify-center items-center lg:px-[30px] lg:py-[20px] md:px-[25px] md:py-[15px] px-[20px] py-[10px]'>
                    Mulai cari jasa terdekat
                </Button>
            </Link>
        </InvitationCard>
        <InvitationCard className='gap-[10px]'>
            <div>
                <h1 className='font-bold lg:text-h1 md:text-h2 text-h3 text-white w-full'>Saya Ingin Menjadi Mitra & Berpenghasilan</h1>
                <p className='lg:text-h4 md:text-h5 text-h6 text-white h-full'>Ubah keahlian Anda menjadi penghasilan stabil. Proses pendaftaran mudah, GRATIS, dan sepenuhnya transparan.</p>
            </div>
            <Link to='partner'>
                <Button variant='primary' className='text-white rounded-[25px] lg:h-[52px] md:h-[40px] h-[35px] lg:text-h4 md:text-h5 text-h6 flex justify-center items-center lg:px-[30px] lg:py-[20px] md:px-[25px] md:py-[15px] px-[20px] py-[10px]'>
                    Daftar & Raih Peluang GRATIS
                </Button>
            </Link>
        </InvitationCard>
    </div>
  )
}

export default Invitation