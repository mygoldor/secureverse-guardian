
import React, { useEffect, useState } from 'react';

const SimpleCookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Check if cookie consent is already stored
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted) {
      setShowBanner(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setShowBanner(false);
    // Here, you could add code to block third-party cookies
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '250px',
        padding: '15px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        fontSize: '14px',
        zIndex: 1000
      }}
    >
      <p>Nous utilisons des cookies pour améliorer votre expérience.</p>
      <button 
        onClick={handleAccept}
        style={{
          margin: '5px',
          padding: '8px 12px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          backgroundColor: '#4caf50',
          color: 'white'
        }}
      >
        Accepter
      </button>
      <button 
        onClick={handleReject}
        style={{
          margin: '5px',
          padding: '8px 12px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          backgroundColor: '#f44336',
          color: 'white'
        }}
      >
        Refuser
      </button>
    </div>
  );
};

export default SimpleCookieBanner;
