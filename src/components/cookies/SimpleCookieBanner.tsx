
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
        width: '350px',
        padding: '20px',
        background: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        fontSize: '14px',
        zIndex: 9999,
        border: '2px solid #4caf50',
        animation: 'fadeIn 0.5s'
      }}
    >
      <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Politique de Cookies</h4>
      <p style={{ margin: '0 0 15px 0', lineHeight: '1.5', color: '#555' }}>
        Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre utilisation des cookies.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button 
          onClick={handleAccept}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: '#4caf50',
            color: 'white',
            transition: 'background-color 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4caf50'}
        >
          Accepter
        </button>
        <button 
          onClick={handleReject}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: '#f44336',
            color: 'white',
            transition: 'background-color 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d32f2f'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
        >
          Refuser
        </button>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SimpleCookieBanner;
