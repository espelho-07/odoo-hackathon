/**
 * Dummy Data
 * 
 * Purpose:
 * Initial data to populate localStorage if the app is run for the first time.
 * Includes users (Admin/Employee), attendance records, and leave requests.
 */

export const INITIAL_DATA = {
  users: [
    {
      id: "admin001",
      name: "Admin User",
      email: "admin@dayflow.com",
      password: "123", // Simple password for demo
      role: "admin",
      department: "Management",
      phone: "123-456-7890",
      salary: 50000,
      avatar: "AD",
      joinDate: "2022-01-01",
      address: "123 Admin St, Tech City"
    },
    {
      id: "emp001",
      name: "John Doe",
      email: "john@dayflow.com",
      password: "123",
      role: "employee",
      department: "Engineering",
      phone: "987-654-3210",
      salary: 35000,
      avatar: "JD",
      joinDate: "2023-03-15",
      address: "456 Coder Ln, Dev Valley"
    }
  ],
  attendance: [
    {
      id: 1,
      userId: "emp001",
      date: "2023-10-25",
      status: "Present",
      checkIn: "09:00",
      checkOut: "17:00"
    },
    {
      id: 2,
      userId: "emp001",
      date: "2023-10-26",
      status: "Present",
      checkIn: "09:15",
      checkOut: "17:10"
    }
  ],
  leaves: [
    {
      id: 1,
      userId: "emp001",
      type: "Sick",
      startDate: "2023-10-20",
      endDate: "2023-10-21",
      reason: "Flu",
      status: "Approved",
      remarks: "Get well soon"
    }
  ]
};
