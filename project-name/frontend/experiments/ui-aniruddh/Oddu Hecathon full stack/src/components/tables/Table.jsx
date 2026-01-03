import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiSearch, FiInbox } from 'react-icons/fi';
import Button from '../common/Button';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Table = ({ columns, data, actions, pagination, onPageChange, loading }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data?.filter(row => 
        Object.values(row).some(val => 
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="w-full">
            {/* Table Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-5">
                <div className="relative w-full sm:w-72">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* Optional: Add Table Filters or Actions here */}
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200">
                                {columns.map((col, idx) => (
                                    <th 
                                        key={idx} 
                                        className={clsx(
                                            "px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider", 
                                            col.className
                                        )}
                                    >
                                        {col.header}
                                    </th>
                                ))}
                                {actions && <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center">
                                         <div className="flex justify-center"><div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>
                                    </td>
                                </tr>
                            ) : filteredData?.length === 0 ? (
                                <tr>
                                     <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="p-4 bg-slate-50 rounded-full"><FiInbox size={24} /></div>
                                            <p>No records found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredData?.map((row, rowIdx) => (
                                    <motion.tr 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: rowIdx * 0.05 }}
                                        key={rowIdx} 
                                        className="hover:bg-indigo-50/30 transition-colors group"
                                    >
                                        {columns.map((col, colIdx) => (
                                            <td key={colIdx} className="px-6 py-4 text-sm text-slate-600">
                                                {col.render ? col.render(row) : row[col.accessor]}
                                            </td>
                                        ))}
                                        {actions && (
                                            <td className="px-6 py-4 text-right">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {typeof actions === 'function' ? actions(row) : actions}
                                                </div>
                                            </td>
                                        )}
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination && (
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                            Showing <span className="font-medium text-slate-800">{pagination.from}</span> to <span className="font-medium text-slate-800">{pagination.to}</span> of <span className="font-medium text-slate-800">{pagination.total}</span> results
                        </span>
                        <div className="flex gap-2">
                            <Button 
                                size="sm" 
                                variant="secondary" 
                                disabled={pagination.currentPage === 1}
                                onClick={() => onPageChange(pagination.currentPage - 1)}
                            >
                                <FiChevronLeft /> Previous
                            </Button>
                            <Button 
                                size="sm" 
                                variant="secondary" 
                                disabled={pagination.currentPage === pagination.lastPage}
                                onClick={() => onPageChange(pagination.currentPage + 1)}
                            >
                                Next <FiChevronRight />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Table;
