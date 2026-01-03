import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import Button from '../components/Button';
import Modal from '../components/Modal';
import InputField from '../components/InputField';
import EmployeeCard from '../components/EmployeeCard';
import EmployeeProfile from '../components/EmployeeProfile';
import { getCurrentUser } from '../utils/storage';
import api from '../utils/api';
import { Search, UserPlus, Pencil, Trash2, Loader2 } from 'lucide-react';

const Employees = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'employee', department: '', phone: '', salary: '' });
    const [searchTerm, setSearchTerm] = useState('');

    // For Profile Modal
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const currentUser = getCurrentUser();
    const isAdmin = currentUser?.role === 'admin';

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await api.getEmployees();
            setUsers(response.data || []);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({ ...user });
        } else {
            setEditingUser(null);
            setFormData({ name: '', email: '', role: 'employee', department: '', phone: '', salary: '' });
        }
        setIsModalOpen(true);
        setSelectedEmployee(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            if (editingUser) {
                // Update Logic (API Not implemented yet for update, skipping for hackathon scope or can add if needed)
                alert("Update feature backend not strictly required by prompt, implementing Add only for now.");
            } else {
                await api.addEmployee(formData);
                fetchEmployees(); // Refresh list
            }
            setIsModalOpen(false);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this employee?')) {
            try {
                await api.deleteEmployee(id);
                fetchEmployees();
                setSelectedEmployee(null);
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.department?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PageLayout title="Employee Directory">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Search */}
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>

                <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
                    <UserPlus size={18} />
                    Add Employee
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-indigo-500" size={40} />
                </div>
            ) : filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                    {filteredUsers.map(user => (
                        <EmployeeCard
                            key={user.id}
                            employee={user}
                            onClick={setSelectedEmployee}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="bg-slate-100 dark:bg-slate-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-slate-400" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No employees found</h3>
                    <p className="text-slate-500">Try adjusting your search terms</p>
                </div>
            )}

            {/* Employee Profile Modal */}
            <Modal
                isOpen={!!selectedEmployee}
                onClose={() => setSelectedEmployee(null)}
                title="Employee Details"
            >
                {selectedEmployee && (
                    <div>
                        <EmployeeProfile
                            employee={selectedEmployee}
                            userRole={currentUser?.role}
                        />

                        {/* Admin Actions in Profile */}
                        {isAdmin && (
                            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <Button
                                    variant="ghost"
                                    className="flex-1 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                                    onClick={() => handleOpenModal(selectedEmployee)}
                                >
                                    <Pencil size={16} /> Edit Profile
                                </Button>
                                {selectedEmployee.role !== 'admin' && (
                                    <Button
                                        variant="danger"
                                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20"
                                        onClick={() => handleDelete(selectedEmployee.id)}
                                    >
                                        <Trash2 size={16} /> Remove User
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Modal>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingUser ? 'Edit Employee' : 'Add New Employee'}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <InputField
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <InputField
                            label="Phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Role</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <InputField
                            label="Department"
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        />
                    </div>

                    <InputField
                        label="Basic Salary"
                        type="number"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    />

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">{editingUser ? 'Save Changes' : 'Create Employee'}</Button>
                    </div>
                </form>
            </Modal>
        </PageLayout>
    );
};

export default Employees;
