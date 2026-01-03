import React, { useState } from 'react';
import { LayoutDashboard, Users, User, Clock, Calendar, DollarSign, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, activePage, setActivePage, userRole }) {
    const { logout } = useAuth();
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Employee'] },
        { id: 'employees', label: 'Employees', icon: Users, roles: ['Admin', 'Employee'] },
        { id: 'attendance', label: 'Attendance', icon: Clock, roles: ['Admin', 'Employee'] },
        { id: 'timeoff', label: 'Time Off', icon: Calendar, roles: ['Admin', 'Employee'] },
        { id: 'salary', label: 'Payroll', icon: DollarSign, roles: ['Admin'] },
        { id: 'policies', label: 'Policies', icon: FileText, roles: ['Admin', 'Employee'] },
    ];

    return (
        <aside className={`sidebar bg-white dark:bg-slate-800 ${isOpen ? 'translate-x-0' : '-translate-x-[300px] lg:translate-x-0'}`}>
            <ul className="mt-5 space-y-1">
                {menuItems.map(item => {
                    if (!item.roles.includes(userRole)) return null;

                    const isActive = activePage === item.id;
                    return (
                        <li key={item.id}>
                            <button
                                onClick={() => setActivePage(item.id)}
                                className={`w-full nav-link flex items-center gap-3 ${!isActive ? 'collapsed text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50' : ''} ${isActive ? 'bg-blue-50 dark:bg-indigo-900/20 text-[#4154f1] dark:text-indigo-400' : ''}`}
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </button>
                        </li>
                    );
                })}

                <li className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-wider px-3">Pages</li>

                <li>
                    <a href="#" className="nav-link collapsed flex items-center gap-3">
                        <User size={18} />
                        <span>Profile</span>
                    </a>
                </li>
            </ul>

            <div className="absolute bottom-4 left-0 w-full px-4">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
