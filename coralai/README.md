
# Kanban Dashboard Documentation

### Overview

The Kanban Dashboard is a web application that allows users to manage tasks organized into columns representing different statuses: "To Do," "In Progress," "Blocked," and "Done." The application includes features like drag-and-drop reordering, Live Mode for automatic ticket transitions, lazy loading, and styling enhancements for a polished user experience.

---

## Features

- **Task Management**: Organize tasks by moving them between columns.
- **Drag-and-Drop**: Drag tasks between columns to update their statuses.
- **Live Mode**: Automatically transition tasks between statuses at regular intervals.
- **Supports Up to 10,000 Tasks**: Initial load of 10,000 tasks with optimizations for performance.
- **Lazy Loading & Virtualization**: Only render tasks within view to enhance performance.
- **Polished UI**: Clear, professional interface with color-coded columns, responsive design, and custom styling.
  
---

## Setup Instructions

### Prerequisites

- **Node.js** (version 14 or later)
- **npm** (Node Package Manager)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd kanban-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```
   - The app should open at [http://localhost:3000](http://localhost:3000).

### Build for Production
To create a production build:
```bash
npm run build
```
This will generate an optimized build in the `build` directory.

---

## Code Structure

```
kanban-dashboard/
└── src/
    ├── components/
    │   ├── Header.js               # Header with Live Mode toggle and Clear All Done button
    │   ├── Header.css              # Styling for Header component
    │   ├── KanbanBoard.js          # Main board containing columns
    │   ├── KanbanBoard.css         # Styling for KanbanBoard component
    │   ├── KanbanColumn.js         # Column component for each task status
    │   ├── KanbanColumn.css        # Styling for KanbanColumn component
    │   ├── Ticket.js               # Individual task ticket component
    │   ├── Ticket.css              # Styling for Ticket component
    │   ├── LoadingSpinner.js       # Loading spinner displayed during initial load
    │   └── LoadingSpinner.css      # Styling for LoadingSpinner
    ├── hooks/                      
    │   └── useFakeTicketTransition.js  # Hook for Live Mode ticket transition effect
    ├── utils/                      
    │   ├── generateTickets.js      # Generates ticket data with Faker
    │   └── fsa.js                  # Finite State Automaton for valid status transitions
    ├── App.js                      # Main application component
    ├── App.css                     # Global styling for the app
    ├── index.js                    # Entry point for React
    └── index.css                   # Styling for index HTML
```

---

## Detailed Feature Explanation

### 1. Drag-and-Drop

- **Library**: `@hello-pangea/dnd` is used for the drag-and-drop functionality.
- **Implementation**: Tasks (tickets) are wrapped in `Draggable` components, and columns are wrapped in `Droppable` components.
- **Usage**: Drag a task to another column to update its status.

### 2. Live Mode

- **Functionality**: When enabled, tasks automatically transition between statuses according to defined rules.
- **Implementation**: 
  - The `useEffect` hook in `App.js` checks if Live Mode is enabled and then periodically updates task statuses.
  - Status transitions follow rules defined in `fsa.js`.
- **Toggle**: Controlled via the "Live Mode" checkbox in the header.

### 3. Lazy Loading & Virtualization

- **Library**: `react-window` is used for virtualized rendering, which loads only the visible tasks on screen.
- **Implementation**:
  - The `FixedSizeList` component in `react-window` is utilized in `KanbanColumn.js`.
  - This optimization ensures smoother performance, even with large numbers of tasks.

### 4. Data Generation

- **Library**: Faker.js is used to generate sample data for tasks.
- **Implementation**:
  - `generateTickets.js` generates tasks with randomized titles, descriptions, and statuses.
  - The function supports generating large datasets up to 10,000 tickets.

### 5. Clear All Done Button

- **Functionality**: Allows users to quickly remove all tasks marked as "Done."
- **Implementation**: The button in `Header.js` triggers a function that filters out tasks with "Done" status.

---

## Styling Notes

- **Column Colors**: Each column is color-coded to represent its status, with translucent backgrounds and subtle gradients.
- **Text Styling**: Headings in columns have a simulated 1px black border effect around the text using `text-shadow`.
- **Hover Effects**: Tickets have subtle scaling and shadow effects on hover for a more interactive feel.

---

## Known Limitations & Future Improvements

- **Performance with Extremely Large Datasets**: While optimized for up to 10,000 tasks, performance could be further improved for datasets beyond this range.
- **Additional Customization**: Adding user preferences for Live Mode intervals or custom status labels could enhance the flexibility of the dashboard.

---

## Troubleshooting

- **Slow Loading**: Ensure `react-window` is properly implemented for virtualized rendering to handle large numbers of tickets.
- **Live Mode Not Working**: Verify that the `useEffect` in `App.js` is properly setting intervals for status transitions and that dependencies are up-to-date.
- **Drag-and-Drop Not Functioning**: Confirm that all `Droppable` and `Draggable` components are correctly configured.

---

## Conclusion

This Kanban Dashboard provides a robust platform for managing tasks with features like drag-and-drop, Live Mode, and support for large data sets. With a focus on user experience, performance, and responsiveness, this app can handle up to 10,000 tasks smoothly while offering a polished, professional interface.
