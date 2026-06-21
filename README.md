# To-Do List Application

A modern, feature-rich to-do list application with persistent local storage functionality.

## Features

✨ **Core Features:**
- ✅ Add, edit, and delete tasks
- 📋 Mark tasks as complete/incomplete
- 💾 Persistent storage using browser localStorage
- 🎯 Filter tasks (All, Active, Completed)
- 📊 Real-time statistics (Total, Active, Completed)
- 🗑️ Clear completed or all tasks
- ⌨️ Keyboard support (Enter to add)

## File Structure

```
├── todo-index.html      # Main HTML file
├── todo-styles.css      # Styling and animations
├── todo-script.js       # Application logic
└── README.md           # This file
```

## How to Use

1. **Open the Application:**
   - Download all three files
   - Open `todo-index.html` in your web browser

2. **Add Tasks:**
   - Type a task in the input field
   - Click "Add Task" or press Enter

3. **Manage Tasks:**
   - **Complete**: Check the checkbox next to a task
   - **Edit**: Click the "Edit" button to modify a task
   - **Delete**: Click the "Delete" button to remove a task

4. **Filter Tasks:**
   - Click "All", "Active", or "Completed" to filter

5. **Clear Tasks:**
   - "Clear Completed" - removes all finished tasks
   - "Clear All" - removes all tasks

## Technical Details

### Storage
- Tasks are stored in browser's `localStorage`
- Each task includes: ID, text, completion status, and creation date
- Data persists even after closing the browser

### Data Structure
```javascript
{
  id: 1234567890,           // Timestamp-based unique ID
  text: "Task description", // Task content
  completed: false,         // Completion status
  createdAt: "date string" // Creation timestamp
}
```

### Design
- Modern dark theme with blue accent
- Smooth animations and transitions
- Responsive design (desktop and mobile)
- Glass-morphism UI elements

## Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Keyboard Shortcuts
- **Enter** - Add task while focused on input
- **Escape** - Can be added for additional functionality

## Future Enhancements
- Task priority levels
- Due dates and reminders
- Categories/tags
- Search functionality
- Dark/Light theme toggle
- Export/Import tasks
- Cloud synchronization

## License
Free to use and modify
