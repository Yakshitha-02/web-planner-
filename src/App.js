import React, { useState } from 'react';
import Tabs from './components/Tabs';
import './App.css';
import TodoList from './components/TodoList';
import Calendar from './components/Calendar';
import Alarms from './components/Alarms';
import Diary from './components/Diary';
//import DayDetails from './components/DayDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfileMenu from './components/ProfileMenu';


function App() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [user, setUser] = useState(localStorage.getItem('mydayapp-user') || '');
  const [showSignup, setShowSignup] = useState(false);
  const [showWelcome, setShowWelcome] = useState(!user);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('mydayapp-user');
    setUser('');
    setShowWelcome(true);
    setShowProfile(false);
  };

  if (!user && showWelcome) {
    return (
      <div className="login-container">
        <div className="login-form" style={{textAlign:'center'}}>
          <h2>Welcome to My Day App</h2>
          <p>Do you already have an account?</p>
          <button style={{margin: '12px', padding: '10px 24px', borderRadius: 8, border: 'none', backgroundColor: '#1976d2', color: 'white', fontWeight: 600, cursor: 'pointer'}} onClick={() => setShowWelcome(false)}>Login</button>
          <button style={{margin: '12px', padding: '10px 24px', borderRadius: 8, border: 'none', backgroundColor: '#388e3c', color: 'white', fontWeight: 600, cursor: 'pointer'}} onClick={() => { setShowSignup(true); setShowWelcome(false); }}>Sign Up</button>
        </div>
      </div>
    );
  }

  if (!user) {
    return showSignup ? (
      <Signup onSignup={setUser} onSwitch={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={setUser} onSwitch={() => setShowSignup(true)} />
    );
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Day App</h1>
        <div style={{ position: 'relative' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              marginRight: 10
            }}
            title={user}
            onClick={() => setShowProfile(true)}
          >
            <span role="img" aria-label="profile">👤</span>
          </button>
          {showProfile && (
            <ProfileMenu user={user} onLogout={handleLogout} onClose={() => setShowProfile(false)} />
          )}
        </div>
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'calendar' && <Calendar />}
      {activeTab === 'diary' && <Diary />}
      {activeTab === 'todo' && <TodoList />}
      {activeTab === 'alarms' && <Alarms />}
    </div>
  );
}

export default App;
