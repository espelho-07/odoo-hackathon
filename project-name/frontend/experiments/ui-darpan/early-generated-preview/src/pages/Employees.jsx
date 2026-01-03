import React, { useState } from 'react';
import { employees } from '../data/employees';
import EmployeeCard from '../components/EmployeeCard';
import { Search } from 'lucide-react';
import EmployeeProfile from './EmployeeProfile';
import Modal from '../components/Modal';

/**
 * Employees Page
 * Lists all employees.
 * 
 * @param {Object} props
 * @param {string} props.userRole - To pass to profile view
 */
export default function Employees({ userRole }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Filter employees
    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Team Members</h1>

                {/* Search Bar */}
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Employee Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.map(employee => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onClick={setSelectedEmployee}
                    />
                ))}
            </div>

            {/* No Results State */}
            {filteredEmployees.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    No employees found matching "{searchTerm}"
                </div>
            )}

            {/* Employee Profile Modal */}
            <Modal
                isOpen={!!selectedEmployee}
                onClose={() => setSelectedEmployee(null)}
                title="Employee Profile"
            >
                {selectedEmployee && (
                    <EmployeeProfile
                        employee={selectedEmployee}
                        userRole={userRole}
                    />
                )}
            </Modal>
        </div>
    );
}
