import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { LogIn } from 'lucide-react';

/**
 * SignIn Page
 * 
 * Purpose:
 * Simple login interface for users to access the dashboard.
 * 
 * Functionality:
 * - Mock login logic (redirects to /dashboard on click).
 * - Toggle for user role (just for demo purposes to switch between Employee/Admin).
 */
const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, validation and API call would go here.
        // For demo, we just redirect.
        if (email.includes('admin')) {
            navigate('/admin');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-600/30">
                        <LogIn className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-slate-400">Sign in to your Dayflow account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <InputField
                        label="Email Address"
                        type="email"
                        placeholder="you@dayflow.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <InputField
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-slate-400 cursor-pointer">
                            <input type="checkbox" className="mr-2 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500" />
                            Remember me
                        </label>
                        <a href="#" className="text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                    </div>

                    <Button type="submit" className="w-full py-3 text-lg">
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-center text-slate-500 text-sm">
                    Don't have an account? <span className="text-indigo-400 cursor-pointer hover:underline">Sign Up</span>
                </div>

                <div className="mt-8 p-4 bg-slate-700/50 rounded-lg text-xs text-slate-400 text-center">
                    <p className="mb-1 fw-bold text-slate-300">Demo Credentials:</p>
                    <p>Employee: user@dayflow.com / anypass</p>
                    <p>Admin: admin@dayflow.com / anypass</p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
