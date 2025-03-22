
import React from 'react';

const PWAInstallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Return only children without any banner functionality
  return <>{children}</>;
};

export default PWAInstallProvider;
