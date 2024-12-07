import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>Генератор паролей</h1>
      <label>
        Длина пароля:
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min="6"
          max="32"
        />
      </label>
      <br />
      <button onClick={() => setPassword('')}>Сгенерировать пароль</button>
      {password && <p><strong>Ваш пароль:</strong> {password}</p>}
    </div>
  );
};

export default PasswordGenerator;
