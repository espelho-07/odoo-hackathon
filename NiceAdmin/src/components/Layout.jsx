import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children, activePage, setActivePage, userRole, handleLogout }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <>
            <Navbar
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                userRole={userRole}
                handleLogout={handleLogout}
            />

            <Sidebar
                isOpen={isSidebarOpen}
                activePage={activePage}
                setActivePage={setActivePage}
                userRole={userRole}
            />

            <main className={`main-content ${!isSidebarOpen ? 'lg:ml-0' : ''}`}>
                <div className="pagetitle mb-5">
                    <h1 className="capitalize">{activePage}</h1>
                    <nav>
                        <ol className="flex text-sm text-gray-500 mt-1">
                            <li className="after:content-['/'] after:px-2">Home</li>
                            <li className="text-[#444444] capitalize">{activePage}</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    {children}
                </section>
            </main>
        </>
    );
}
