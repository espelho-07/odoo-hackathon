import React from 'react';
import AdminDashboard from './dashboard/AdminDashboard';
import EmployeeDashboard from './dashboard/EmployeeDashboard';

export default function Dashboard({ userRole }) {
    // Determine which dashboard to show based on role
    // userRole is expected to be 'Admin' or 'Employee' (capitalized from App.jsx)

    if (userRole === 'Admin') {
        return <AdminDashboard />;
    }

    return <EmployeeDashboard />;
}
