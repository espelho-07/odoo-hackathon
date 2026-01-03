import React from 'react';
import { Menu, Search, Bell, MessageSquare, ChevronDown, LogOut } from 'lucide-react';

export default function Navbar({ toggleSidebar, userRole, handleLogout }) {
    return (
        <header className="header">
            <div className="flex items-center justify-between min-w-[240px]">
                <a href="#" className="flex items-center gap-2 no-underline">
                    <span className="text-2xl font-bold font-display text-[#012970] hidden lg:block">Dayflow</span>
                </a>
                <button onClick={toggleSidebar} className="text-[#012970] lg:hidden ml-4">
                    <Menu size={24} />
                </button>
            </div>

            <div className="search-bar hidden md:block ml-10">
                <form className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 w-[300px]">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search"
                        title="Enter search keyword"
                        className="border-none outline-none text-sm w-full text-gray-600"
                    />
                    <button type="button" title="Search" className="text-gray-400 hover:text-[#4154f1]">
                        <Search size={16} />
                    </button>
                </form>
            </div>

            <nav className="ml-auto">
                <ul className="flex items-center gap-4 pr-6">
                    <li className="relative">
                        <a href="#" className="text-[#012970] relative">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">4</span>
                        </a>
                    </li>
                    <li className="relative">
                        <a href="#" className="text-[#012970] relative">
                            <MessageSquare size={20} />
                            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
                        </a>
                    </li>

                    <li className="ml-4 pl-4 border-l border-gray-200 flex items-center gap-3 cursor-pointer group relative">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Profile" className="w-[36px] h-[36px] rounded-full object-cover" />
                        <span className="text-[#012970] text-sm font-semibold hidden md:block">{userRole} User</span>
                        <ChevronDown size={16} className="text-[#012970]" />

                        {/* Dropdown */}
                        <ul className="absolute right-0 top-10 bg-white shadow-xl border border-gray-100 rounded-lg p-2 w-[200px] hidden group-hover:block animate-fade-in z-50">
                            <li className="px-3 py-2 border-b border-gray-100">
                                <h6 className="font-bold text-[#012970]">Kevin Anderson</h6>
                                <span className="text-xs text-gray-500">{userRole}</span>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#4154f1] rounded transition-colors"
                                >
                                    <LogOut size={16} />
                                    <span>Sign Out</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
