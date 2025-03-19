
import React from 'react';
import PrivacyPolicySection from '../PrivacyPolicySection';
import { useLanguage } from '@/contexts/LanguageContext';

const CookiesSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <PrivacyPolicySection title={`9. ${t('cookie_management')}`}>
      <p className="mb-3">Guardia {t('cookies')}:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>Ensure proper website functioning (essential cookies)</li>
        <li>Remember your preferences (functional cookies)</li>
        <li>Improve performance and security (anonymized analytical cookies)</li>
      </ul>
      <p className="mb-4">
        <strong>You can refuse cookies</strong> via your browser settings or our cookie management banner.
      </p>
    </PrivacyPolicySection>
  );
};

export default CookiesSection;
