import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Salary from './pages/Salary';
import TimeOff from './pages/TimeOff';

/**
 * App Component
 * serves as the main layout and router for the hackathon demo.
 * 
 * DESIGN DECISION:
 * We are using conditional rendering instead of React Router
 * to keep the demo self-contained and easy to deploy/run
 * without complex setup.
 */
function App() {
    // State to simulate authentication and routing
    const [userRole, setUserRole] = useState(null); // 'Admin' | 'Employee' | null
    const [activePage, setActivePage] = useState('dashboard');

    // If not logged in, show Login page
    if (!userRole) {
        return <Login onLogin={setUserRole} />;
    }

    // Render the active page component
    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return <Dashboard />;
            case 'employees':
                return <Employees userRole={userRole} />;
            case 'attendance':
                return <Attendance userRole={userRole} />;
            case 'salary':
                return <Salary userRole={userRole} />;
            case 'timeoff':
                return <TimeOff userRole={userRole} />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navigation */}
            <Navbar userRole={userRole} onLogout={() => setUserRole(null)} />

            <div className="flex flex-1">
                {/* Sidebar Navigation */}
                <Sidebar
                    activePage={activePage}
                    onNavigate={setActivePage}
                    userRole={userRole}
                />

                {/* Main Content Area */}
                <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-4rem)]">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}

export default App;
