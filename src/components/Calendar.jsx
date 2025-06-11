import React, { useState } from 'react';
import DayDetails from './DayDetails';

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsDate, setDetailsDate] = useState('');

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const days = [];

  // Fill empty slots for days before the 1st
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }

  // Fill days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <div className="calendar-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2 style={{ margin: '0 12px' }}>
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIdx) => (
            <tr key={weekIdx}>
              {days.slice(weekIdx * 7, weekIdx * 7 + 7).map((d, i) => {
                const isToday =
                  d === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear();
                const dateStr = d
                  ? `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
                  : '';
                return (
                  <td
                    key={i}
                    style={
                      isToday
                        ? { background: '#1976d2', color: 'white', borderRadius: '50%' }
                        : {}
                    }
                    onMouseDown={() => {
                      if (d) {
                        setDetailsDate(dateStr);
                        setShowDetails(true);
                      }
                    }}
                  >
                    {d ? d : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {showDetails && (
        <DayDetails dateStr={detailsDate} onClose={() => setShowDetails(false)} />
      )}
    </div>
  );
};

export default Calendar;
