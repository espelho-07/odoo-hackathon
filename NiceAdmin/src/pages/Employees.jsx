import React, { useState } from 'react';
import { employees } from '../data/employees';
import EmployeeCard from '../components/EmployeeCard';
import Modal from '../components/Modal';
import EmployeeProfile from './EmployeeProfile';
import { Search, Plus, AlertCircle } from 'lucide-react';

export default function Employees({ userRole }) {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            {/* Header & Search */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#012970]">Team Directory</h2>

                <div className="flex gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search employees..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4154f1] transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    </div>

                    {userRole === 'Admin' && (
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-[#4154f1] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <Plus size={18} /> Add Employee
                        </button>
                    )}
                </div>
            </div>

            {/* Employee Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEmployees.map(emp => (
                    <EmployeeCard
                        key={emp.id}
                        employee={emp}
                        onClick={setSelectedEmployee}
                    />
                ))}

                {filteredEmployees.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-400">
                        <p>No employees found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>

            {/* PROFILE VIEW MODAL */}
            {selectedEmployee && (
                <Modal isOpen={true} onClose={() => setSelectedEmployee(null)}>
                    <EmployeeProfile
                        employee={selectedEmployee}
                        userRole={userRole}
                    />
                </Modal>
            )}

            {/* ADD EMPLOYEE MODAL (Wireframe: Sign Up Fields) */}
            {isAddModalOpen && (
                <Modal isOpen={true} onClose={() => setIsAddModalOpen(false)}>
                    <div className="p-2">
                        <h3 className="text-xl font-bold text-[#012970] mb-1">Onboard New Employee</h3>
                        <p className="text-sm text-gray-500 mb-6">Create a new user account. Login credentials will be auto-generated.</p>

                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); alert('Employee Created'); }}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                    <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#4154f1] outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none">
                                        <option>IT / Engineering</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                    </select>
                                </div>
                            </div>

                            {/* Wireframe Logic Note */}
                            <div className="bg-yellow-50 border border-yellow-100 p-3 rounded text-xs text-yellow-800 flex gap-2">
                                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                                <div>
                                    <strong>System Note:</strong> Login ID and Password will be automatically generated.
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-[#4154f1] rounded hover:bg-blue-700 shadow-md">Create Account</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}

        </div>
    );
}
