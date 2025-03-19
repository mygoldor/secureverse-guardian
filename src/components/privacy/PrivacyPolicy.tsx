
import React from 'react';
import { Separator } from '@/components/ui/separator';
import PrivacyPolicyHeader from './PrivacyPolicyHeader';
import CompanyInfoSection from './PrivacyPolicySections/CompanyInfoSection';
import DataCollectionSection from './PrivacyPolicySections/DataCollectionSection';
import DataUsageSection from './PrivacyPolicySections/DataUsageSection';
import LegalBasisSection from './PrivacyPolicySections/LegalBasisSection';
import DataSharingSection from './PrivacyPolicySections/DataSharingSection';
import DataRetentionSection from './PrivacyPolicySections/DataRetentionSection';
import UserRightsSection from './PrivacyPolicySections/UserRightsSection';
import DataSecuritySection from './PrivacyPolicySections/DataSecuritySection';
import CookiesSection from './PrivacyPolicySections/CookiesSection';
import PolicyChangesSection from './PrivacyPolicySections/PolicyChangesSection';
import ContactSection from './PrivacyPolicySections/ContactSection';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-800">
      <PrivacyPolicyHeader lastUpdated="June 1, 2023" />
      <Separator className="my-6" />
      <CompanyInfoSection />
      <DataCollectionSection />
      <DataUsageSection />
      <LegalBasisSection />
      <DataSharingSection />
      <DataRetentionSection />
      <UserRightsSection />
      <DataSecuritySection />
      <CookiesSection />
      <PolicyChangesSection />
      <ContactSection />
    </div>
  );
};

export default PrivacyPolicy;
