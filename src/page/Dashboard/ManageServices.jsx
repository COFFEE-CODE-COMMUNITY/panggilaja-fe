import TableServices from './sections/TableServices'
import StatCardService from './sections/StatCardService'

const ManageServices = () => {
  return (
    <div className='w-full lg:px-[15px] lg:py-[10px] md:px-[10px] md:py-[5px] px-[5px] py-[5px] flex flex-col gap-[10px]'>
      <div className='h-full flex flex-col w-full gap-10'>
        <StatCardService />
        <TableServices />
      </div>
    </div>
  )
}

export default ManageServices