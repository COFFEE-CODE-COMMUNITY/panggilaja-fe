import TableServices from './sections/TableServices'
import StatCardService from './sections/StatCardService'

const ManageServices = () => {
  return (
    <div className='w-full lg:px-[15px] md:px-[10px] px-[5px] lg:py-[10px] md:py-[5px] py-[5px] flex flex-col gap-[10px] sm:mb-20'>
      <div className='h-full flex flex-col w-full gap-10'>
        <TableServices />
      </div>
    </div>
  )
}

export default ManageServices