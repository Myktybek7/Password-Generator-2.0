import React, { useState } from 'react'; 
import CryptoJS from 'crypto-js'; 
 
const PasswordGenerator = () => { 
  const [password, setPassword] = useState(''); 
  const [length, setLength] = useState(12); 
  const [error, setError] = useState(''); 
  const [history, setHistory] = useState( 
    JSON.parse(localStorage.getItem('passwordHistory')) || [] 
  ); 
 
  const assessPasswordStrength = (password) => { 
    let score = 0; 
    if (password.length >= 8) score += 1; 
    if (/[A-Z]/.test(password)) score += 1; 
    if (/[a-z]/.test(password)) score += 1; 
    if (/[0-9]/.test(password)) score += 1; 
    if (/[@#$%^&+=!,.?]/.test(password)) score += 1; 
 
    if (score === 5) return 'Очень надежный'; 
    if (score === 4) return 'Надежный'; 
    if (score === 3) return 'Удовлетворительный'; 
    return 'Слабый'; 
  }; 
 
  const generatePassword = () => { 
    setError(''); 
    if (length < 6 || length > 32) { 
      setError('Длина пароля должна быть от 6 до 32 символов.'); 
      return; 
    } 
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&+=!,.?'; 
    let newPassword = ''; 
    for (let i = 0; i < length; i++) { 
      const randomIndex = Math.floor(Math.random() * chars.length); 
      newPassword += chars[randomIndex]; 
    } 
    const strength = assessPasswordStrength(newPassword); 
    setPassword(newPassword); 
    addToHistory(newPassword, strength); 
  }; 
 
  const encryptPassword = (password) => { 
    const secretKey = 'cat';  
    return CryptoJS.AES.encrypt(password, secretKey).toString(); 
  }; 
 
  const decryptPassword = (encryptedPassword) => { 
    const secretKey = 'cat';  
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey); 
    return bytes.toString(CryptoJS.enc.Utf8); 
  }; 
 
  const addToHistory = (newPassword, strength) => { 
    const encryptedPassword = encryptPassword(newPassword); 
    const newHistory = [...history, { password: encryptedPassword, strength }]; 
    setHistory(newHistory); 
    localStorage.setItem('passwordHistory', JSON.stringify(newHistory)); 
  }; 
 
  const clearHistory = () => { 
    setHistory([]); 
    localStorage.removeItem('passwordHistory'); 
  }; 
 
  const copyToClipboard = () => { 
    if (password) { 
      navigator.clipboard.writeText(password); 
      alert('Пароль скопирован в буфер обмена!'); 
    } 
  }; 
 
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
      <button onClick={generatePassword} style={{ margin: '10px 0' }}> 
        Сгенерировать пароль 
      </button> 
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      {password && ( 
        <div> 
          <p><strong>Ваш пароль:</strong> {password}</p> 
          <button onClick={copyToClipboard}>Копировать в буфер обмена</button> 
        </div> 
      )} 
 
      <h2>История паролей</h2> 
      <button onClick={clearHistory} style={{ margin: '10px 0' }}>Очистить историю</button> 
      <ul> 
        {history.map((entry, index) => ( 
          <li key={index}> 
            <strong>{entry.strength}:</strong> {decryptPassword(entry.password)} 
          </li> 
        ))} 
      </ul> 
    </div> 
  ); 
}; 
 
export default PasswordGenerator;