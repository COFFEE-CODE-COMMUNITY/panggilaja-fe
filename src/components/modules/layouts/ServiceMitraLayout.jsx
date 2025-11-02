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
                <div className="w-full max-w-xs md:max-w-lg lg:max-w-xl mx-auto pb-[10px]">
                    <div className="text-center ">
                        <h1 className="lg:text-h3 md:text-h4 text-h5 font-bold text-green-700 ">PanggilAja</h1>
                    </div>

                    <div className="w-full ">
                        <div className="flex items-start justify-center">
                            <div className="flex flex-col items-center text-center w-7 md:w-9 lg:w-10">
                                <div 
                                className={`
                                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                    ${currentStepId === 1 ? 'border-green-700 bg-white' : ''}
                                    ${currentStepId > 1 ? 'border-green-700 bg-green-700' : ''}
                                `}
                                >
                                {currentStepId === 1 && <div className="w-3 h-3 bg-green-700 rounded-full"></div>}
                                {currentStepId > 1 && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                </div>
                                
                                <span 
                                className={`
                                    mt-2 lg:text-h5 text-h6 w-[150px] transition-all
                                    ${currentStepId >= 1 ? 'text-green-700 font-semibold' : 'text-gray-400'}
                                `}
                                >
                                Informasi Profil
                                </span>
                            </div>

                            <div 
                                className={`
                                flex-1 h-0.5 mt-3 
                                ${currentStepId > 1 ? 'bg-green-700' : 'bg-gray-300'}
                                `}
                            ></div>

                            
                            <div className="flex flex-col items-center text-center w-7 md:w-9 lg:w-10">
                                <div 
                                className={`
                                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                    ${currentStepId === 2 ? 'border-green-700 bg-white' : ''}
                                    ${currentStepId > 2 ? 'border-green-700 bg-green-700' : ''}
                                    ${currentStepId < 2 ? 'border-gray-300 bg-gray-300' : ''}
                                `}
                                >
                                {currentStepId === 2 && <div className="w-3 h-3 bg-green-700 rounded-full"></div>}
                                {currentStepId > 2 && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                </div>
                                
                                <span 
                                className={`
                                    mt-2 lg:text-h5 text-h6 w-[150px] transition-all
                                    ${currentStepId >= 2 ? 'text-green-700 font-semibold' : 'text-gray-400'}
                                `}
                                >
                                Tambah Jasa
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet /> 
        </div>
    );
}

export default ServicesMitraLayout;