
import React from 'react';

const PaymentLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-security-primary"></div>
    </div>
  );
};

export default PaymentLoader;
