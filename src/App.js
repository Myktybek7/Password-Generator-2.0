import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [error, setError] = useState('');

  const generatePassword = () => {
    setError('');
    if (length < 6 || length > 32) {
      setError('Password length must be between 6 and 32 characters.');
      return;
    }
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&+=!,.?';
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>Password Generator</h1>
      <label>
        Password length:
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min="6"
          max="32"
        />
      </label>
      <br />
      <button onClick={generatePassword}>Generate Password</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {password && <p><strong>Your password:</strong> {password}</p>}
    </div>
  );
};

export default PasswordGenerator;
