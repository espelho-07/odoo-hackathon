/**
 * Dummy Attendance Data
 * Simulates backend attendance records.
 * In a real app, this would come from an API.
 */
export const attendanceRecords = [
    {
        id: 101,
        employeeId: 2, // Aniruddh
        employeeName: "Aniruddh Singh",
        date: "2023-10-25",
        checkIn: "09:30 AM",
        checkOut: "06:30 PM",
        status: "Present",
        workHours: "9h 0m"
    },
    {
        id: 102,
        employeeId: 3, // Manav
        employeeName: "Manav Shah",
        date: "2023-10-25",
        checkIn: "-",
        checkOut: "-",
        status: "On Leave",
        workHours: "0h 0m"
    },
    {
        id: 103,
        employeeId: 4, // Karan
        employeeName: "Karan Mehta",
        date: "2023-10-25",
        checkIn: "10:00 AM",
        checkOut: "07:00 PM",
        status: "Present",
        workHours: "9h 0m"
    }
];

export const todayAttendance = {
    checkInTime: null,
    checkOutTime: null,
    isCheckedIn: false
};
