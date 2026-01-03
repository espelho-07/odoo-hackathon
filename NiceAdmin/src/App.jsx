import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import TimeOff from './pages/TimeOff';
import Salary from './pages/Salary';
import Policies from './pages/Policies';

const AuthenticatedApp = () => {
    const { user, logout } = useAuth();
    const [activePage, setActivePage] = useState('dashboard');

    const renderPage = () => {
        // Pass userRole derived from user context
        const role = user?.role === 'admin' ? 'Admin' : 'Employee'; // Normalize role string

        switch (activePage) {
            case 'dashboard': return <Dashboard userRole={role} />;
            case 'employees': return <Employees userRole={role} />;
            case 'attendance': return <Attendance userRole={role} />;
            case 'timeoff': return <TimeOff userRole={role} />;
            case 'salary': return <Salary userRole={role} />;
            case 'policies': return <Policies />;
            default: return <Dashboard userRole={role} />;
        }
    };

    const role = user?.role === 'admin' ? 'Admin' : 'Employee';

    return (
        <Layout
            activePage={activePage}
            setActivePage={setActivePage}
            userRole={role}
            handleLogout={logout}
        >
            {renderPage()}
        </Layout>
    );
};

function App() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path="/*" element={user ? <AuthenticatedApp /> : <Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
