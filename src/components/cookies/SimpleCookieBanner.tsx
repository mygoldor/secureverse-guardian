
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
        width: '300px',
        padding: '20px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        fontSize: '14px',
        zIndex: 1000,
        border: '1px solid #ddd'
      }}
    >
      <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Politique de Cookies</h4>
      <p style={{ margin: '0 0 15px 0', lineHeight: '1.5' }}>Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre utilisation des cookies.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button 
          onClick={handleAccept}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: '#4caf50',
            color: 'white',
            transition: 'background-color 0.2s'
          }}
        >
          Accepter
        </button>
        <button 
          onClick={handleReject}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: '#f44336',
            color: 'white',
            transition: 'background-color 0.2s'
          }}
        >
          Refuser
        </button>
      </div>
    </div>
  );
};

export default SimpleCookieBanner;
