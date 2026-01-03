import React from 'react';

/**
 * Table Component
 * 
 * Purpose:
 * Simple reusable table for displaying lists of data.
 * Updated for Theme Support.
 */
const Table = ({ columns, data, actions }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="py-4 px-6 border-b border-slate-200 dark:border-slate-700">
                                {col.header}
                            </th>
                        ))}
                        {actions && <th className="py-4 px-6 border-b border-slate-200 dark:border-slate-700">Actions</th>}
                    </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-300 divide-y divide-slate-200 dark:divide-slate-700">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="py-8 text-center text-slate-500">
                                No records found.
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIdx) => (
                            <tr key={row.id || rowIdx} className="hover:bg-white dark:hover:bg-slate-800/50 transition-colors">
                                {columns.map((col, colIdx) => (
                                    <td key={colIdx} className="py-4 px-6">
                                        {typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="py-4 px-6">
                                        {actions(row)}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
