import React from 'react';

/**
 * Login Page
 * Mock login functionality for the hackathon demo.
 * 
 * @param {Object} props
 * @param {Function} props.onLogin - Handler to set user role
 */
export default function Login({ onLogin }) {
    // Hackathon Note: We are using simple buttons to simulate login
    // No real authentication is implemented.

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">D</span>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">Welcome to Dayflow</h1>
                <p className="text-center text-slate-500 mb-8">HR Management System Demo</p>

                <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 mb-6">
                        <p className="text-sm text-indigo-700 font-medium text-center">
                            ⚠️ Authentication skipped for demo
                        </p>
                        <p className="text-xs text-indigo-600 text-center mt-1">
                            Select a role to continue
                        </p>
                    </div>

                    <button
                        onClick={() => onLogin('Admin')}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                    >
                        Login as Admin
                    </button>

                    <button
                        onClick={() => onLogin('Employee')}
                        className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors"
                    >
                        Login as Employee
                    </button>
                </div>

                <div className="mt-8 text-center text-xs text-slate-400">
                    Odoo x GCET Hackathon Submission
                </div>
            </div>
        </div>
    );
}
