import React, { useState } from 'react';
import api from '../api';

export default function Signup({ onAuth }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('Creating account...');
    try {
      const data = await api.signup({ name, email, password });
      setMsg('✅ Account created!');
      onAuth(data.user, data.token);
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    }
  }

  return (
    <div className="container card">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required />
        <button className="btn" type="submit">Sign Up</button>
      </form>
      <p className="muted small">{msg}</p>
    </div>
  );
}
