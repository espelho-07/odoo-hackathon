import React, { useState } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import TimeOff from './pages/TimeOff';
import Salary from './pages/Salary';
import Policies from './pages/Policies';

function App() {
    const [userRole, setUserRole] = useState(null); // 'Admin' | 'Employee' | null
    const [activePage, setActivePage] = useState('dashboard');

    if (!userRole) {
        return <Login onLogin={setUserRole} />;
    }

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <Dashboard userRole={userRole} />;
            case 'employees': return <Employees userRole={userRole} />;
            case 'attendance': return <Attendance userRole={userRole} />;
            case 'timeoff': return <TimeOff userRole={userRole} />;
            case 'salary': return <Salary userRole={userRole} />;
            case 'policies': return <Policies />;
            default: return <Dashboard />;
        }
    };

    return (
        <Layout
            activePage={activePage}
            setActivePage={setActivePage}
            userRole={userRole}
            handleLogout={() => setUserRole(null)}
        >
            {renderPage()}
        </Layout>
    );
}

export default App;
