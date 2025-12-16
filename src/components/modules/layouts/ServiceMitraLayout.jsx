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
                </div>
            </div>
            <div className='overflow-y-auto'>
                <Outlet />
            </div>
        </div>
    );
}

export default ServicesMitraLayout;