/**
 * Dummy Leave Data
 * Simulates leave requests in the system.
 */
export const leaveRequests = [
    {
        id: 1,
        employeeId: 3,
        employeeName: "Manav Shah",
        type: "Sick Leave",
        startDate: "2023-10-25",
        endDate: "2023-10-26",
        reason: "Viral fever",
        status: "Approved" // Pending, Approved, Rejected
    },
    {
        id: 2,
        employeeId: 2,
        employeeName: "Aniruddh Singh",
        type: "Paid Leave",
        startDate: "2023-11-01",
        endDate: "2023-11-05",
        reason: "Family vacation",
        status: "Pending"
    }
];
