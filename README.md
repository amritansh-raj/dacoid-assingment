# Calendar and Event Management App

A modern calendar and event management app built with React.js and TypeScript. This app allows users to view a monthly calendar, manage events, and persist data locally for seamless usability.

---

## Features

### **Core Features**

1. **Calendar View**:

   - Displays a grid layout for the current month.
   - Supports navigation between months using "Previous" and "Next" buttons.
   - Highlights the current day and selected day.
   - Distinguishes weekends from weekdays visually.

2. **Event Management**:

   - Add events by clicking on any day.
   - Edit or delete events from a selected day.
   - Event details include:
     - Event name
     - Start and end time
     - Optional description

3. **Event List**:

   - Displays all events for the selected day in a modal or side panel.

4. **Data Persistence**:
   - Uses **localStorage** for persisting events across page refreshes.

### **Complex Logic**

- Automatically handles month transitions (e.g., January 31 to February 1).
- Prevents overlapping events to ensure clarity.

## Getting Started

### **Prerequisites**

- Node.js (v16 or higher recommended)
- Bun (optional) or npm as your package manager

### **Installation**

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd calendar-event-management-app
   ```

````
2. Install dependencies:

Using Bun:
```bash
bun install
````

Using npm:

```bash
npm install
```

3. Start the development server:

Using Bun:

```bash
bun run dev
```

Using npm:

```bash
npm run dev
```

4. Open your browser and navigate to:

```bash
http://localhost:5173
```
