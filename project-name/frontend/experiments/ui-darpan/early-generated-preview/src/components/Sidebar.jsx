import React from 'react';
import { LayoutDashboard, Users, CalendarCheck, IndianRupee, Clock } from 'lucide-react';

/**
 * Sidebar Component
 * Navigation menu for the application.
 * 
 * @param {Object} props
 * @param {string} props.activePage - Currently active page identifier
 * @param {Function} props.onNavigate - Function to change pages
 * @param {string} props.userRole - Current user role (Admin/Employee)
 */
export default function Sidebar({ activePage, onNavigate, userRole }) {

    // Define menu items based on role
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Employee'] },
        { id: 'employees', label: 'Employees', icon: Users, roles: ['Admin', 'Employee'] },
        { id: 'attendance', label: 'Attendance', icon: CalendarCheck, roles: ['Admin', 'Employee'] },
        { id: 'timeoff', label: 'Time Off', icon: Clock, roles: ['Admin', 'Employee'] },
        // Salary is Admin only
        { id: 'salary', label: 'Payroll', icon: IndianRupee, roles: ['Admin'] },
    ];

    // Filter items visible to current user
    const visibleItems = menuItems.filter(item => item.roles.includes(userRole));

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-[calc(100vh-4rem)] sticky top-16">
            <div className="p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</p>
                <div className="space-y-1">
                    {visibleItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activePage === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-auto p-4 border-t border-slate-800">
                <div className="bg-slate-800/50 rounded-lg p-3 text-xs text-slate-500">
                    <p className="font-medium text-slate-400 mb-1">Hackathon Demo</p>
                    <p>Version 0.1.0</p>
                </div>
            </div>
        </aside>
    );
}
