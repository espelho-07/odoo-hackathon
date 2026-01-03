import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css'; // We'll create this for custom overrides

// Mock Holidays and Events
const events = [
    { date: '2024-01-26', title: 'Republic Day', type: 'holiday' },
    { date: '2024-03-25', title: 'Holi', type: 'holiday' },
    { date: '2024-08-15', title: 'Independence Day', type: 'holiday' },
    { date: '2024-10-02', title: 'Gandhi Jayanti', type: 'holiday' },
    { date: '2024-12-25', title: 'Christmas', type: 'holiday' },
    { date: '2024-10-31', title: 'Diwali', type: 'holiday' },
    { date: '2024-08-01', title: 'Project Deadline', type: 'event' }, // Near future example
    { date: '2024-09-05', title: 'Team Outing', type: 'event' }
];

const EventCalendar = () => {
    const [value, onChange] = useState(new Date());

    const getTileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            const event = events.find(e => e.date === dateStr);

            if (event) {
                return (
                    <div className="flex justify-center mt-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${event.type === 'holiday' ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                    </div>
                );
            }
        }
        return null;
    };

    const getTileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            const event = events.find(e => e.date === dateStr);
            if (event) return event.type === 'holiday' ? 'holiday-tile' : 'event-tile';
        }
    };

    return (
        <div className="calendar-container">
            <Calendar
                onChange={onChange}
                value={value}
                tileContent={getTileContent}
                tileClassName={getTileClassName}
                className="w-full border-none rounded-xl font-sans text-sm shadow-none"
            />
            {/* Legend / Info */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-4 justify-center text-xs">
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-slate-500 dark:text-slate-400">Holiday</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span className="text-slate-500 dark:text-slate-400">Event</span>
                </div>
            </div>
        </div>
    );
};

export default EventCalendar;
