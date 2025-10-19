api' React, { useState } from 'react';
import api from '../../api';

export default function Messages({ user }) {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState('');

  async function sendMessage(e) {
    e.preventDefault();
    try {
      setSent('Sending...');
      await api.claimItem('1234', msg); // replace with actual ID when integrated
      setSent('✅ Sent!');
    } catch (err) {
      setSent(`❌ ${err.message}`);
    }
  }

  return (
    <div className="container card">
      <h2>Messages</h2>
      <form onSubmit={sendMessage}>
        <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Enter message..." required />
        <button className="btn" type="submit">Send</button>
      </form>
      <p className="muted small">{sent}</p>
    </div>
  );
}
