import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [error, setError] = useState('');
  const [strength, setStrength] = useState('');

  const assessPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[@#$%^&+=!,.?]/.test(password)) score += 1;

    if (score === 5) return 'Very Strong';
    if (score === 4) return 'Strong';
    if (score === 3) return 'Medium';
    return 'Weak';
  };

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
    const passwordStrength = assessPasswordStrength(newPassword);
    setPassword(newPassword);
    setStrength(passwordStrength);
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
      {password && (
        <div>
          <p><strong>Your password:</strong> {password}</p>
          <p><strong>Strength:</strong> {strength}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
