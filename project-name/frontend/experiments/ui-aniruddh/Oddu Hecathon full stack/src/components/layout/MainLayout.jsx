import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const MainLayout = () => {
    const { sidebarOpen } = useApp();
  
    return (
      <div className="min-h-screen bg-slate-50 flex font-outfit text-slate-900">
        <Sidebar />
        
        <div 
            className={clsx(
                "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                // Mobile: Always 0 margin (sidebar overlays)
                // Desktop: Sidebar is static (part of flow), so flex handles it. We DO NOT need margin-left.
                // However, we want the MainLayout to manage the width of the sidebar space if the sidebar was fixed.
                // Checking Sidebar.jsx: It is "lg:static". 
                // So the Sidebar component itself takes up width in the flex container.
                // Therefore, this div should just be flex-1. No margins.
                "w-full"
            )}
        >
          <Topbar />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8 relative">
            <div className="max-w-[1600px] mx-auto w-full space-y-6">
                <Outlet />
            </div>
          </main>
        </div>
      </div>
    );
};

export default MainLayout;
