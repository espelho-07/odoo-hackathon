import React from 'react';
import StatusBadge from './StatusBadge';
import { Mail, Phone } from 'lucide-react';

export default function EmployeeCard({ employee, onClick }) {
    // Wireframe: Simple card with Profile Pic, Name, Status indicator
    return (
        <div
            onClick={() => onClick(employee)}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col items-center text-center group cursor-pointer border border-gray-100 hover:border-blue-100 animate-fade-in"
        >
            {/* Top Right Status Indicator (Wireframe Note: "Icon indicating status") */}
            <div className="absolute top-4 right-4">
                <StatusBadge status={employee.status} />
            </div>

            <div className="relative mb-4 mt-2">
                <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform"
                />
            </div>

            <h3 className="text-lg font-bold text-[#012970] mb-0 group-hover:text-[#4154f1] transition-colors">{employee.name}</h3>
            <p className="text-sm text-gray-500 mb-4 font-medium">{employee.role}</p>

            <div className="w-full mt-auto pt-4 border-t border-gray-100 flex justify-center gap-6">
                <a href={`mailto:${employee.email}`} onClick={e => e.stopPropagation()} className="text-gray-400 hover:text-[#4154f1] transition-colors" title="Email">
                    <Mail size={18} />
                </a>
                <a href={`tel:${employee.phone}`} onClick={e => e.stopPropagation()} className="text-gray-400 hover:text-green-600 transition-colors" title="Call">
                    <Phone size={18} />
                </a>
            </div>
        </div>
    );
}
