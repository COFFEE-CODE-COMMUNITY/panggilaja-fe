import TableServices from './sections/TableServices'
import StatCardService from './sections/StatCardService'

const ManageServices = () => {
  return (
    <div className='w-full px-[15px] py-[10px] flex flex-col gap-[10px]'>
        <div className='h-full flex flex-col max-w-7xl gap-10'>
            <StatCardService/>
            <TableServices/>
        </div>
    </div>
  )
}

export default ManageServices