import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

function ServicesMitraLayout() {
    const location = useLocation(); 
    const currentPath = location.pathname;

    let currentStepId = 1; 
    if (currentPath.startsWith('/partner/mitra-form/add-service')) {
        currentStepId = 2;
    }

    return (
        <div className='h-screen flex flex-col'>
            <div className="w-full shadow-sm z-10 relative">
                <div className="w-full max-w-xs md:max-w-lg lg:max-w-2xl mx-auto py-4">
                    <div className="text-center mb-2">
                        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-primary">PanggilAja</h1>
                    </div>

                    <div className="w-full px-4">
                        <div className="flex items-center justify-between relative">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center z-10 px-2">
                                <div 
                                    className={`
                                        w-4 h-4 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                        ${currentStepId === 1 ? 'border-primary bg-white shadow-lg' : ''}
                                        ${currentStepId > 1 ? 'border-primary bg-primary' : ''}
                                    `}
                                >
                                    {currentStepId === 1 && <div className="w-2 h-2 md:w-3 md:h-3 bg-primary rounded-full"></div>}
                                    {currentStepId > 1 && (
                                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    )}
                                </div>
                                
                                <span 
                                    className={`
                                        mt-3 text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap
                                        ${currentStepId >= 1 ? 'text-primary' : 'text-gray-400'}
                                    `}
                                >
                                    Informasi Profil
                                </span>
                            </div>

                            {/* Progress Line */}
                            <div className="absolute -left-4 -right-5 top-2 md:top-3 flex items-center px-4" style={{zIndex: 0}}>
                                <div className="w-full h-1 bg-gray-200 rounded-full mx-auto" style={{maxWidth: 'calc(100% - 120px)', marginLeft: '60px', marginRight: '60px'}}>
                                    <div 
                                        className={`h-full rounded-full transition-all duration-500 ease-in-out ${currentStepId > 1 ? 'bg-primary' : 'bg-gray-200'}`}
                                        style={{width: currentStepId > 1 ? '100%' : '0%'}}
                                    ></div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center z-10 px-2">
                                <div 
                                    className={`
                                        w-4 h-4 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                        ${currentStepId === 2 ? 'border-primary bg-white shadow-lg' : ''}
                                        ${currentStepId > 2 ? 'border-primary bg-primary' : ''}
                                        ${currentStepId < 2 ? 'border-gray-300 bg-white' : ''}
                                    `}
                                >
                                    {currentStepId === 2 && <div className="w-4 h-4 md:w-3 md:h-3 bg-primary rounded-full"></div>}
                                    {currentStepId > 2 && (
                                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    )}
                                    {currentStepId < 2 && <span className="text-gray-400 text-h6 md:text-h5 font-semibold"></span>}
                                </div>
                                
                                <span 
                                    className={`
                                        mt-3 text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap
                                        ${currentStepId >= 2 ? 'text-primary' : 'text-gray-400'}
                                    `}
                                >
                                    Tambah Jasa
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='overflow-y-auto'>
                <Outlet /> 
            </div>
        </div>
    );
}

export default ServicesMitraLayout;