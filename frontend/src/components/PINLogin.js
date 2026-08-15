import React, { useState } from 'react';
import './PINLogin.css';

function PINLogin({ onLoginSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const CORRECT_PIN = '1234';

  const handlePINChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setPin(value);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      onLoginSuccess(pin);
    } else {
      setError('Invalid PIN');
      setPin('');
    }
  };

  return (
    <div className="pin-login-container">
      <div className="pin-login-box">
        <h1>Notes</h1>
        <form onSubmit={handleSubmit}>
          <div className="pin-input-group">
            <input
              type="password"
              inputMode="numeric"
              maxLength="4"
              value={pin}
              onChange={handlePINChange}
              placeholder="••••"
              className="pin-input"
              autoFocus
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default PINLogin;
