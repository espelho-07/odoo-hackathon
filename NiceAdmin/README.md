# Dayflow HRMS - Frontend (Refactored)

> Odoo X GCET Hackathon Submission

This project is a React-based refactor of the "NiceAdmin" Bootstrap template, converted into a clean, modern HRMS frontend named **Dayflow**. 

## 🎨 Design Philosophy (Important)
*   **UI Foundation**: Strictly follows the **NiceAdmin** template (Light Theme, Indigo/Blue palette, Card-based layout).
*   **Functionality Scource**: Detailed functionalities (Tabs, Fields, Modals, User Flows) are derived directly from the provided **Wireframes**.
*   **Correction**: Initial attempts to apply "Dark Mode" based on wireframe visuals have been reverted in favor of a consistent NiceAdmin theme.

## 🚀 Features Implemented
*   **Login**: Role-based access with ID format tooltips.
*   **Dashboard**: Performance counters and activity tracking.
*   **Employees**: Advanced Directory with search.
    *   **Profile**: 4-Tab detailed view (Private Info, Salary Breakdown, etc.) matching wireframe data structures.
*   **Attendance**:
    *   **Admin**: Monitoring table with "Extra Hours" calculation.
    *   **Employee**: Personal summary stats (Days Present, Leaves) in a clean card view.
*   **Time Off**:
    *   **Employee**: "New Request" workflow + Leave Balance cards.
    *   **Admin**: Approval/Rejection actions.
    *   **Modal**: Detailed request form matching wireframe fields (Reason, Attachment, Validity).

## 🛠️ Tech Stack
*   **React (Vite)**
*   **Tailwind CSS**
*   **Lucide React Icons**

## 🏃 How to Run Locally

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Dev Server**:
    ```bash
    npm run dev
    ```

3.  **Access**:
    Open `http://localhost:5173`.

---

**Original Template Credit**: NiceAdmin (BootstrapMade).
**Refactored By**: Dayflow Team (AI Assisted).
