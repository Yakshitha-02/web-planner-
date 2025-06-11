import React, { useState, useRef, useEffect } from 'react';

const getTodayKey = () => {
  const today = new Date();
  return 'alarms-' + today.toISOString().slice(0, 10);
};

const getTimeString = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Alarms = () => {
  const [alarms, setAlarms] = useState(() => {
    const stored = localStorage.getItem(getTodayKey());
    return stored ? JSON.parse(stored) : [];
  });
  const [newTime, setNewTime] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editTime, setEditTime] = useState('');
  const alarmAudio = useRef(null);
  const storageKey = getTodayKey();

  // Save alarms to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(alarms));
  }, [alarms, storageKey]);

  // Check alarms every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nowStr = now.toTimeString().slice(0, 5);
      alarms.forEach((alarm, idx) => {
        if (!alarm.triggered && alarm.time === nowStr) {
          alert(`⏰ Alarm for ${alarm.time}!`);
          alarmAudio.current?.play();
          setAlarms((prev) =>
            prev.map((a, i) => (i === idx ? { ...a, triggered: true } : a))
          );
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [alarms]);

  const addAlarm = () => {
    if (!newTime) return;
    setAlarms([...alarms, { time: newTime, triggered: false }]);
    setNewTime('');
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      addAlarm();
    }
  };

  const deleteAlarm = (idx) => {
    setAlarms(alarms.filter((_, i) => i !== idx));
  };

  const startEdit = (idx) => {
    setEditIdx(idx);
    setEditTime(alarms[idx].time);
  };

  const saveEdit = (idx) => {
    setAlarms(
      alarms.map((alarm, i) =>
        i === idx ? { ...alarm, time: editTime, triggered: false } : alarm
      )
    );
    setEditIdx(null);
    setEditTime('');
  };

  return (
    <div className="alarms-container" style={{ maxWidth: 400, margin: '0 auto', padding: 16 }}>
      <h2>Alarms</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <button onClick={addAlarm}>Set Alarm</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {alarms.map((alarm, idx) => (
          <li key={idx} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            {editIdx === idx ? (
              <>
                <input
                  type="time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                />
                <button onClick={() => saveEdit(idx)}>Save</button>
                <button onClick={() => setEditIdx(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{alarm.time}</span>
                <button onClick={() => startEdit(idx)}>Edit</button>
                <button onClick={() => deleteAlarm(idx)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <audio ref={alarmAudio} src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" preload="auto" />
    </div>
  );
};

export default Alarms;
