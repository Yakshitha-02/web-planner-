import React, { useState } from 'react';
import './ProfileMenu.css';

const ProfileMenu = ({ user, onLogout, onClose }) => {
  const [showChange, setShowChange] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [msg, setMsg] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('mydayapp-users') || '{}');
    if (users[user] !== oldPass) {
      setMsg('Old password is incorrect.');
      return;
    }
    users[user] = newPass;
    localStorage.setItem('mydayapp-users', JSON.stringify(users));
    setMsg('Password changed successfully!');
    setOldPass('');
    setNewPass('');
    setShowChange(false);
  };

  return (
    <div className="profile-menu-modal">
      <div className="profile-menu-content">
        <button className="profile-menu-exit" onClick={onClose} title="Close">✖</button>
        <h3>Account Details</h3>
        <div><strong>Username:</strong> {user}</div>
        <button className="profile-menu-btn" onClick={() => setShowChange(!showChange)}>
          Change Password
        </button>
        {showChange && (
          <form onSubmit={handleChangePassword} className="profile-menu-form">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPass}
              onChange={e => setOldPass(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
              required
            />
            <button type="submit">Save</button>
          </form>
        )}
        <button className="profile-menu-btn" onClick={onLogout} style={{ background: '#d32f2f', marginTop: 12 }}>
          Logout
        </button>
        {msg && <div className="profile-menu-msg">{msg}</div>}
      </div>
    </div>
  );
};

export default ProfileMenu;
