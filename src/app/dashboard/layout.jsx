import { DashboardSideBar } from '@/components/dashboard/DashboardSideBar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (

        <div className="flex flex-col lg:flex-row min-h-screen w-full">
            <DashboardSideBar />
            <div className="flex-1 w-full min-w-0">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;


