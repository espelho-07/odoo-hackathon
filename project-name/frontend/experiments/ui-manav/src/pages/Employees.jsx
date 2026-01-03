import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import InputField from '../components/InputField';
import { getData, addEmployee, updateEmployee, deleteEmployee } from '../utils/storage';
import { Plus, Pencil, Trash2, Search, UserPlus } from 'lucide-react';

const Employees = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        name: '', email: '', role: 'employee', department: '', phone: '', salary: ''
    });

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        const allUsers = getData('dayflow_users');
        setUsers(allUsers);
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
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (editingUser) {
            updateEmployee({ ...editingUser, ...formData });
        } else {
            const result = addEmployee(formData);
            if (!result.success) {
                alert(result.message);
                return;
            }
        }

        setIsModalOpen(false);
        refreshData();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this employee?')) {
            deleteEmployee(id);
            refreshData();
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.department?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            header: "Name", accessor: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-300">
                        {row.avatar || row.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">{row.name}</p>
                        <p className="text-xs text-slate-500">{row.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: "Role", accessor: (row) => (
                <span className={`px-2 py-1 rounded-md text-xs font-semibold uppercase ${row.role === 'admin'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
                        : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
                    }`}>
                    {row.role}
                </span>
            )
        },
        { header: "Dept", accessor: "department" },
        {
            header: "Salary", accessor: (row) => (
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    ${Number(row.salary).toLocaleString()}
                </span>
            )
        },
        { header: "Joined", accessor: "joinDate" },
    ];

    const actions = (row) => (
        <div className="flex gap-2">
            <button
                onClick={() => handleOpenModal(row)}
                className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
                <Pencil size={16} />
            </button>
            {row.role !== 'admin' && ( // Prevent deleting admins for safety in demo
                <button
                    onClick={() => handleDelete(row.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            )}
        </div>
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

            <Card>
                <Table columns={columns} data={filteredUsers} actions={actions} />
            </Card>

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
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
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
