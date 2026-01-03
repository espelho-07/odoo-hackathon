import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

/**
 * PageLayout Component
 * 
 * Purpose:
 * Provides the structural "Shell" of the application.
 * Sidebar on the left, Content on the right.
 * Handles background colors for Theme modes.
 */
const PageLayout = ({ children, title }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex font-sans text-slate-900 dark:text-slate-200 transition-colors duration-300">
            {/* Sidebar handles its own fixed/sticky positioning */}
            <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Mobile Header / Navbar */}
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} title={title} />

                {/* Scrollable Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default PageLayout;
