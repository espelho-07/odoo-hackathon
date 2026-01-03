import React, { useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

export default function Layout({ children, activePage, setActivePage, userRole, handleLogout }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <>
            <Topbar
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                isSidebarOpen={isSidebarOpen}
            />

            <Sidebar
                isOpen={isSidebarOpen}
                activePage={activePage}
                setActivePage={setActivePage}
                userRole={userRole}
            />

            <main className={`main-content transition-all duration-300 ${!isSidebarOpen ? 'lg:ml-0' : 'lg:ml-72'} ${!isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
                <div className="p-6 pt-24 bg-slate-50 min-h-screen">
                    <div className="pagetitle mb-6">
                        <h1 className="capitalize text-2xl font-bold text-slate-800">{activePage}</h1>
                        <nav>
                            <ol className="flex text-sm text-slate-500 mt-1">
                                <li className="after:content-['/'] after:px-2">Home</li>
                                <li className="text-indigo-600 capitalize font-medium">{activePage}</li>
                            </ol>
                        </nav>
                    </div>

                    <section className="section dashboard">
                        {children}
                    </section>
                </div>
            </main>
        </>
    );
}
