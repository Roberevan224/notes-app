import React, { useState, useEffect } from 'react';
import './App.css';
import PINLogin from './components/PINLogin';
import NotesApp from './components/NotesApp';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState(null);

  useEffect(() => {
    // Check if PIN is stored in localStorage
    const storedPin = localStorage.getItem('pin');
    if (storedPin) {
      setIsAuthenticated(true);
      setPin(storedPin);
    }
  }, []);

  const handlePINSuccess = (userPin) => {
    localStorage.setItem('pin', userPin);
    setPin(userPin);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('pin');
    setPin(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="app">
      {!isAuthenticated ? (
        <PINLogin onLoginSuccess={handlePINSuccess} />
      ) : (
        <NotesApp pin={pin} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
