(() => {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const totalCount = document.getElementById('totalCount');
  const activeCount = document.getElementById('activeCount');
  const completedCount = document.getElementById('completedCount');
  const clearCompletedBtn = document.getElementById('clearCompleted');
  const clearAllBtn = document.getElementById('clearAll');

  const STORAGE_KEY = 'todoItems';
  let currentFilter = 'all';
  let tasks = [];

  // Load tasks from localStorage
  function loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    tasks = stored ? JSON.parse(stored) : [];
    renderTasks();
    updateStats();
  }

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // Add new task
  function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
      taskInput.focus();
      return;
    }

    const task = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toLocaleString()
    };

    tasks.unshift(task);
    saveTasks();
    taskInput.value = '';
    taskInput.focus();
    renderTasks();
    updateStats();
  }

  // Delete task
  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
  }

  // Toggle task completion
  function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
      updateStats();
    }
  }

  // Edit task
  function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      const newText = prompt('Edit task:', task.text);
      if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
      }
    }
  }

  // Filter tasks based on current filter
  function getFilteredTasks() {
    switch (currentFilter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      default:
        return tasks;
    }
  }

  // Render tasks
  function renderTasks() {
    const filtered = getFilteredTasks();
    taskList.innerHTML = '';

    if (filtered.length === 0) {
      emptyState.classList.add('show');
      return;
    }

    emptyState.classList.remove('show');

    filtered.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''}
          onchange="window.todoApp.toggleTask(${task.id})"
        />
        <div class="task-text">${escapeHtml(task.text)}</div>
        <div class="task-date">${task.createdAt}</div>
        <div class="task-actions">
          <button class="edit-btn" onclick="window.todoApp.editTask(${task.id})">Edit</button>
          <button class="delete-btn" onclick="window.todoApp.deleteTask(${task.id})">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }

  // Update statistics
  function updateStats() {
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;

    totalCount.textContent = total;
    activeCount.textContent = active;
    completedCount.textContent = completed;
  }

  // Clear all completed tasks
  function clearCompleted() {
    if (tasks.some(t => t.completed)) {
      if (confirm('Clear all completed tasks?')) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
        updateStats();
      }
    }
  }

  // Clear all tasks
  function clearAll() {
    if (tasks.length > 0) {
      if (confirm('This will delete all tasks. Are you sure?')) {
        tasks = [];
        saveTasks();
        renderTasks();
        updateStats();
      }
    }
  }

  // Escape HTML special characters
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Event listeners
  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTasks();
    });
  });

  clearCompletedBtn.addEventListener('click', clearCompleted);
  clearAllBtn.addEventListener('click', clearAll);

  // Expose methods globally for onclick handlers
  window.todoApp = {
    toggleTask,
    deleteTask,
    editTask
  };

  // Initialize
  loadTasks();
})();