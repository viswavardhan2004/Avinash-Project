import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    return (
        <div className="flex h-screen w-full bg-[#000000] p-6 gap-6 relative overflow-hidden">
            {/* Strict B/W/B Structural Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-800/5 blur-[120px] rounded-full" />

            <Sidebar />
            <div className="flex-1 flex flex-col gap-6 overflow-hidden relative">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
