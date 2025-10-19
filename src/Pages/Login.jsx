import React, { useState } from 'react';
import api from '../api';

export default function Login({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('Logging in...');
    try {
      const data = await api.login({ email, password });
      setMsg('✅ Logged in!');
      onAuth(data.user, data.token);
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    }
  }

  return (
    <div className="container card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">Login</button>
      </form>
      <p className="muted small">{msg}</p>
    </div>
  );
}
