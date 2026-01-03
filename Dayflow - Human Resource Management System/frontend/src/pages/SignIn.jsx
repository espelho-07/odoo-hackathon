import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
// import { loginUser } from '../utils/storage'; // Removed mock login
import api from '../utils/api'; // Import API
import { Briefcase, ArrowRight, ShieldCheck, User } from 'lucide-react';

const SignIn = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('employee'); // 'employee' | 'admin'
    const [email, setEmail] = useState('john@dayflow.com');
    const [password, setPassword] = useState('123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setError('');
        if (newRole === 'admin') {
            setEmail('admin@dayflow.com');
        } else {
            setEmail('john@dayflow.com');
        }
        setPassword('123');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Call Backend API
            const response = await api.login(email, password);
            const user = response.data;

            // Enforce Role Check
            if (user.role !== role) {
                setError(`Access Denied. You are logged in as ${user.role}, but tried to sign in as ${role}.`);
                setLoading(false);
                return;
            }

            // Save session (Temporary hybrid approach: Keep using localStorage for now so other parts of app don't break immediately)
            localStorage.setItem('dayflow_current_user', JSON.stringify(user));

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

            <div className="w-full max-w-5xl mx-auto flex items-center justify-center p-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center w-full">

                    {/* Left Side: Copy */}
                    <div className="hidden md:block space-y-6">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-xl mb-8">
                            <Briefcase className="text-indigo-400" size={32} />
                        </div>
                        <h1 className="text-5xl font-bold text-white tracking-tight leading-tight">
                            Manage your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Team</span> with confidence.
                        </h1>
                        <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                            Dayflow is the modern, intuitive HR platform designed for growing teams. Streamline attendance, payroll, and more.
                        </p>
                    </div>

                    {/* Right Side: Form */}
                    <div className="bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">

                        {/* Role Switcher */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-950 p-1.5 rounded-full border border-slate-800 shadow-xl flex gap-1">
                            <button
                                onClick={() => handleRoleChange('employee')}
                                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all ${role === 'employee'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                <User size={16} /> Employee
                            </button>
                            <button
                                onClick={() => handleRoleChange('admin')}
                                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all ${role === 'admin'
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                <ShieldCheck size={16} /> Admin
                            </button>
                        </div>

                        <div className="mb-8 mt-4 text-center">
                            <h2 className="text-2xl font-bold text-white">
                                {role === 'admin' ? 'Admin Portal' : 'Employee Login'}
                            </h2>
                            <p className="text-slate-400 text-sm">Welcome back! Please enter your details.</p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <InputField
                                label="Email"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                                </div>
                                <InputField
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                variant={role === 'admin' ? 'secondary' : 'primary'}
                                className={`w-full py-4 text-lg flex items-center justify-center gap-2 group mt-4 ${role === 'admin' ? '!bg-purple-600 hover:!bg-purple-500' : ''}`}
                            >
                                {loading ? 'Authenticating...' : `Sign in as ${role === 'admin' ? 'Admin' : 'Employee'}`}
                                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                            </Button>
                        </form>

                        <div className="mt-8 text-center text-xs text-slate-500">
                            <p>First time here? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Activate Employee Account</Link></p>
                            <p className="mt-2 text-slate-600">Secured by Dayflow Identity</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
