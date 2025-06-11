import React, { useState } from 'react';
import './Login.css';

const Signup = ({ onSignup, onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('mydayapp-users') || '{}');
    if (users[username]) {
      setError('Username already exists.');
      return;
    }
    users[username] = password;
    localStorage.setItem('mydayapp-users', JSON.stringify(users));
    localStorage.setItem('mydayapp-user', username);
    onSignup(username);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <div className="login-error">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <div className="login-switch">
          Already have an account?{' '}
          <span className="login-link" onClick={onSwitch}>Login</span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
