
import React from 'react';

interface PrivacyPolicyHeaderProps {
  lastUpdated: string;
}

const PrivacyPolicyHeader: React.FC<PrivacyPolicyHeaderProps> = ({ lastUpdated }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Privacy Policy</h2>
      <p className="text-sm text-right mb-4 text-security-muted">Last updated: {lastUpdated}</p>
      
      <div className="prose prose-sm max-w-none">
        <p className="text-security-muted mb-6">
          Welcome to <strong>Guardia</strong>. We value the protection of your personal data 
          and we are committed to respecting the <strong>General Data Protection Regulation (GDPR)</strong>. 
          This privacy policy explains how we collect, use, and protect your information.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicyHeader;
