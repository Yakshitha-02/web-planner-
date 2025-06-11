import React, { useState, useEffect } from 'react';

const getTodayDateStr = () => {
  // Use YYYY-MM-DD format for consistency with DayDetails
  return new Date().toISOString().slice(0, 10);
};

const Diary = () => {
  const todayStr = getTodayDateStr();
  const [entry, setEntry] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('diary-' + todayStr);
    if (saved) {
      setEntry(saved);
      setIsCompleted(true);
    } else {
      setEntry('');
      setIsCompleted(false);
    }
  }, [todayStr]);

  const handleChange = (e) => {
    setEntry(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('diary-' + todayStr, entry);
    setIsCompleted(true);
    setIsEditing(false);
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (entry.trim()) handleSave();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    localStorage.removeItem('diary-' + todayStr);
    setEntry('');
    setIsCompleted(false);
    setIsEditing(true);
  };

  return (
    <div className="diary-container" style={{ maxWidth: 500, margin: '0 auto', padding: 16 }}>
      <h2>How was your day? Share with me!</h2>
      <div style={{ marginBottom: 12, color: '#1976d2', fontWeight: 600 }}>{todayStr}</div>
      {(!isCompleted || isEditing) ? (
        <>
          <textarea
            value={entry}
            onChange={handleChange}
            placeholder="Write about your day..."
            rows={8}
            style={{ width: '100%', borderRadius: 8, padding: 10, fontSize: '1rem', border: '1px solid #bdbdbd' }}
            onKeyDown={handleTextareaKeyDown}
          />
          <button onClick={handleSave} disabled={!entry.trim()} style={{ marginTop: 8, padding: '10px 16px', borderRadius: 8, border: 'none', backgroundColor: '#1976d2', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
            Save Entry
          </button>
        </>
      ) : (
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <div style={{ color: '#388e3c', fontWeight: 600, marginBottom: 8 }}>
            Diary entry completed for day ({todayStr})
          </div>
          <div style={{ whiteSpace: 'pre-line', background: '#f8fafc', borderRadius: 8, padding: 12, marginBottom: 12, border: '1px solid #bdbdbd' }}>
            {entry}
          </div>
          <button onClick={handleEdit} style={{ marginRight: 8, padding: '10px 16px', borderRadius: 8, border: 'none', backgroundColor: '#1976d2', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
            Edit
          </button>
          <button onClick={handleDelete} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', backgroundColor: '#d32f2f', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Diary;
