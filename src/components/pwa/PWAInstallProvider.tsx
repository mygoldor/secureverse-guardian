
import React from 'react';

const PWAInstallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Banner is completely disabled now
  return (
    <>
      {children}
    </>
  );
};

export default PWAInstallProvider;
