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

            <main className={`main-content transition-all duration-300 ${!isSidebarOpen ? 'lg:ml-0' : 'lg:ml-[300px]'}`}>
                <div className="p-4 pt-20 lg:pt-20 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
                    <div className="pagetitle mb-0 flex items-center gap-2">
                        <h1 className="capitalize text-xl font-bold text-slate-800 dark:text-white mr-4">{activePage}</h1>
                        <nav className="hidden sm:block">
                            <ol className="flex text-sm text-slate-500 dark:text-slate-400 items-center">
                                <li>
                                    <button
                                        onClick={() => setActivePage('dashboard')}
                                        className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        Home
                                    </button>
                                </li>
                                <li className="px-2">/</li>
                                <li className="text-indigo-600 dark:text-indigo-400 capitalize font-medium">{activePage}</li>
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
