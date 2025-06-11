import React from 'react';
import './Tabs.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'calendar', label: 'Calendar' },
    { id: 'diary', label: 'Diary' },
    { id: 'todo', label: 'To-Do' },
    { id: 'alarms', label: 'Alarms' }
  ];

  return (
    <div className="tab-bar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
