import React, { useState, useEffect } from 'react';
import './TodoList.css';

const getTodayKey = () => {
  const today = new Date();
  return 'tasks-' + today.toISOString().slice(0, 10);
};

const TodoList = () => {
  const [dateKey, setDateKey] = useState(getTodayKey());
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem(getTodayKey());
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch {
      return [];
    }
  });
  const [newTask, setNewTask] = useState('');

  // Update dateKey and tasks if the day changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newKey = getTodayKey();
      if (newKey !== dateKey) {
        setDateKey(newKey);
        const storedTasks = localStorage.getItem(newKey);
        setTasks(storedTasks ? JSON.parse(storedTasks) : []);
      }
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, [dateKey]);

  // Save tasks to localStorage whenever tasks or dateKey change
  useEffect(() => {
    try {
      localStorage.setItem(dateKey, JSON.stringify(tasks));
    } catch {}
  }, [tasks, dateKey]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask.trim(), completed: false }]);
    setNewTask('');
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />
            <input
              type="text"
              value={task.text}
              onChange={(e) => editTask(index, e.target.value)}
            />
            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
