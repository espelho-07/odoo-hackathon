# IMPL: Dashboard Enhancements (Calendar, Split History, Extra Hours)

The user wants to refine the Dashboard by splitting history, adding metric cards, and including an event calendar.

## User Review Required
> [!NOTE]
> I will install `react-calendar` to handle the calendar functionality efficiently.

## Proposed Changes

### Dependencies
- Run `npm install react-calendar`

### Components [ui-manav/src/components]
#### [NEW] [EventCalendar.jsx](file:///d:/BTech/Darshan%20University/Hackathon's/Odoo%20X%20GCET%20Hackathon/project-name/frontend/experiments/ui-manav/src/components/EventCalendar.jsx)
- **Purpose**: A styled wrapper around `react-calendar`.
- **Features**:
    - Highlight holidays (Christmas, New Year, etc.).
    - Highlight specific events (Mock data).
    - Responsive styling to fit in a Dashboard card.

### Pages [ui-manav/src/pages]
#### [MODIFY] [Dashboard.jsx](file:///d:/BTech/Darshan%20University/Hackathon's/Odoo%20X%20GCET%20Hackathon/project-name/frontend/experiments/ui-manav/src/pages/Dashboard.jsx)
- **Layout Changes**:
    - **Split History**: Convert the "Recent Leave Requests" section into two distinct cards:
        1.  **Attendance History**: Last 5 days check-in/out times.
        2.  **Leave History**: Recent leave requests.
    - **New Card**: **Extra Hours Worked**.
        - Logic: `Total Hours Worked - (Days Present * 8)`.
        - Display: "Overtime: +12.5 hrs" or similar.
    - **Calendar Section**:
        - Grid layout update to accommodate the Calendar size.

## Verification Plan
### Manual Verification
1.  **Calendar**: Verify it displays, and shows dots/colors for specified holidays.
2.  **History**: Verify two separate lists appear (Attendance and Leaves).
3.  **Extra Hours**: Check the calculation logic (visually verify it says something reasonable like "+2h" or "0h").
