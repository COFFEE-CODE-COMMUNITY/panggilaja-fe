import React from 'react'
import FormAddDocs from './sections/FormAddDocs'

const AddDocs = () => {
    return (
        <div className='w-full flex-1 min-h-[85vh]'>
            <div className='h-full flex gap-[15px] lg:py-[30px] md:py-[20px] py-[10px] sm:mb-0 mb-10 w-full'>
                <FormAddDocs />
            </div>
        </div>
    )
}

export default AddDocs
