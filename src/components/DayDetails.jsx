// import React, { useState } from 'react';
// import TodoList from './TodoList';
// import Alarms from './Alarms';
import './DayDetails.css';

const getDiaryEntry = (dateStr) => {
  return localStorage.getItem('diary-' + dateStr) || '';
};
const getTodoList = (dateStr) => {
  // Use per-day tasks for both DayDetails and TodoList
  const perDay = localStorage.getItem('tasks-' + dateStr);
  if (perDay) return JSON.parse(perDay);
  return [];
};
const getAlarms = (dateStr) => {
  return JSON.parse(localStorage.getItem('alarms-' + dateStr) || '[]');
};

const DayDetails = ({ dateStr, onClose }) => {
  const diary = getDiaryEntry(dateStr);
  const todos = getTodoList(dateStr);
  const alarms = getAlarms(dateStr);
  return (
    <div className="day-details-modal">
      <div className="day-details-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h3>Details for {dateStr}</h3>
        <div>
          <strong>Diary:</strong>
          <div style={{whiteSpace:'pre-line', background:'#f8fafc', borderRadius:8, padding:8, marginBottom:8, border:'1px solid #bdbdbd'}}>{diary || 'No entry.'}</div>
        </div>
        <div>
          <strong>Todo List:</strong>
          <ul>{todos.length ? todos.map((t,i) => <li key={i}>{t.text}</li>) : <li>No tasks.</li>}</ul>
        </div>
        <div>
          <strong>Alarms:</strong>
          <ul>{alarms.length ? alarms.map((a,i) => <li key={i}>{a.time}</li>) : <li>No alarms.</li>}</ul>
        </div>
      </div>
    </div>
  );
};

export default DayDetails;

// In the TodoList component, make sure to use the same 'tasks' key for both reading and writing tasks.
// This is already done in your current TodoList.jsx implementation.
