import React from 'react'

const ModalServiceAdded = ({ onBack }) => {
  return (
    <div className='h-screen w-full fixed bg-white/60 z-900 justify-center flex items-center top-0 left-0 right-0'>
      <div className="bg-white relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
              <div className="p-4 md:p-5 text-center">
                  <svg className="mx-auto mb-4 text-success w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <h3 className="mb-2 text-heading font-semibold text-lg">Service Added Successfully!</h3>
                  <p className="mb-6 text-body">Your service has been successfully added and is now available in your service list.</p>
                  <button 
                    onClick={onBack}
                    type="button" 
                    className="hover:bg-primary/80 cursor-pointer bg-primary text-white box-border border border-transparent hover:bg-primary-strong focus:ring-4 focus:ring-primary-medium shadow-xs font-medium leading-5 rounded-base text-sm px-6 py-2.5 focus:outline-none">
                    Back to Manage Services
                  </button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default ModalServiceAdded