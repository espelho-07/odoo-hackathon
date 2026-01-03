import React, { useState } from 'react';
import { LayoutDashboard, Users, User, Clock, Calendar, DollarSign, FileText } from 'lucide-react';

export default function Sidebar({ isOpen, activePage, setActivePage, userRole }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Employee'] },
        { id: 'employees', label: 'Employees', icon: Users, roles: ['Admin', 'Employee'] },
        { id: 'attendance', label: 'Attendance', icon: Clock, roles: ['Admin', 'Employee'] },
        { id: 'timeoff', label: 'Time Off', icon: Calendar, roles: ['Admin', 'Employee'] },
        { id: 'salary', label: 'Payroll', icon: DollarSign, roles: ['Admin'] },
        { id: 'policies', label: 'Policies', icon: FileText, roles: ['Admin', 'Employee'] },
    ];

    return (
        <aside className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-[300px] lg:translate-x-0'}`}>
            <ul className="mt-5 space-y-1">
                {menuItems.map(item => {
                    if (!item.roles.includes(userRole)) return null;

                    const isActive = activePage === item.id;
                    return (
                        <li key={item.id}>
                            <button
                                onClick={() => setActivePage(item.id)}
                                className={`w-full nav-link ${!isActive ? 'collapsed' : ''} ${isActive ? 'bg-blue-50 text-[#4154f1]' : ''}`}
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </button>
                        </li>
                    );
                })}

                <li className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-wider px-3">Pages</li>

                <li>
                    <a href="#" className="nav-link collapsed">
                        <User size={18} />
                        <span>Profile</span>
                    </a>
                </li>
            </ul>
        </aside>
    );
}
