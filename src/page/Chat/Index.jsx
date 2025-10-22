import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/common/Button'
import { useDispatch, useSelector } from 'react-redux'

const ChatPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
  return (
    <div className='w-full md:min-h-screen flex justify-center p-[20px]'>
        <div className='lg:w-7/10 md:w-9/10 w-full md:flex md:flex-row flex flex-col gap-[10px]'>
            <div className='md:hidden border-2 border-gray-100 px-[10px] py-[5px] flex flex-col gap-[10px]'>
                <p>Detail Jasa</p>
                <div className='flex flex-col gap-[5px]'>
                </div>
            </div>
            <div className='md:w-3/4 w-full md:h-full lg:px-[30px] md:px-[15px] px-[10px] lg:py-[25px] md:py-[10px] py-[5px] flex flex-col gap-[10px] md:justify-center border-2 border-gray-100'>
                <div>
                    <div>
                        <div className='w-full px-[15px] py-[10px] bg-gray-50 rounded-[5px]'>
                            <p className=''>Alamat</p>
                            <div className='flex font-light gap-[20px]'>
                                <p>Popo</p>
                                <p className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, saepe id. Impedit porro quos aut fugit consequuntur aspernatur eos dignissimos!</p>
                            </div>
                        </div>
                        <form action="" className='flex flex-col gap-[15px]'>
                            <div className='flex flex-col'>
                                <label htmlFor="pesan">Pesan</label>
                                <textarea name="pesan" id="pesan" placeholder='Masukkan pesan' className='h-[300px] border-2 border-gray-100 p-[15px] rounded-[15px]'></textarea>
                            </div>
                            <Button variant='primary' className='text-white px-[20px] py-[15px] w-full rounded-[25px]'>
                                Kirim
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='md:w-1/4 hidden h-full border-2 border-gray-100 px-[10px] py-[5px] md:flex md:flex-col gap-[10px]'>
                <p>Detail Jasa</p>
                <div className='flex flex-col gap-[5px]'>
                    <div className='w-full bg-amber-100 h-[200px]'></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatPage