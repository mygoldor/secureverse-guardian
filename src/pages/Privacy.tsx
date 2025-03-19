
import React, { useState } from 'react';
import Header from '@/components/Header';
import { UserCheck, Eye, Fingerprint, Trash2 } from 'lucide-react';
import ProtectionCard from '@/components/ProtectionCard';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  const [privacySettings, setPrivacySettings] = useState({
    trackingPrevention: true,
    cookiesManagement: true,
    passwordProtection: false,
    dataCleanup: true,
  });

  const handleTogglePrivacy = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-security-foreground">Privacy</h1>
          <p className="text-security-muted mt-2">Manage how your data is collected and used in compliance with GDPR regulations.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <ProtectionCard
            title="Tracking Prevention"
            description="Blocks third-party trackers that collect your browsing data across websites."
            icon={Eye}
            enabled={privacySettings.trackingPrevention}
            onToggle={() => handleTogglePrivacy('trackingPrevention')}
            color="text-security-primary"
          />
          
          <ProtectionCard
            title="Cookie Management"
            description="Controls which websites can store cookies on your device and for how long."
            icon={Fingerprint}
            enabled={privacySettings.cookiesManagement}
            onToggle={() => handleTogglePrivacy('cookiesManagement')}
            color="text-security-danger"
          />
          
          <ProtectionCard
            title="Password Protection"
            description="Monitors saved passwords and alerts you if they are found in data breaches."
            icon={UserCheck}
            enabled={privacySettings.passwordProtection}
            onToggle={() => handleTogglePrivacy('passwordProtection')}
            color="text-security-warning"
          />
          
          <ProtectionCard
            title="Data Cleanup"
            description="Automatically deletes browsing history and temporary files to protect your privacy."
            icon={Trash2}
            enabled={privacySettings.dataCleanup}
            onToggle={() => handleTogglePrivacy('dataCleanup')}
            color="text-security-success"
          />
        </div>
        
        <div className="mt-10 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-center">Privacy Policy</h2>
          <p className="text-sm text-right mb-4 text-security-muted">Last updated: June 1, 2023</p>
          
          <div className="prose prose-sm max-w-none">
            <p className="text-security-muted mb-6">
              Welcome to <strong>Guardia</strong>. We value the protection of your personal data 
              and we are committed to respecting the <strong>General Data Protection Regulation (GDPR)</strong>. 
              This privacy policy explains how we collect, use, and protect your information.
            </p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">1. Who are we?</h3>
            <p className="mb-4">
              Guardia is a cybersecurity solution designed to protect individuals and businesses against online threats. 
              We are responsible for processing the personal data we collect.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h4 className="font-medium mb-2">Data controller contact information:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Company name</strong>: Guardia Cybersecurity SRL</li>
                <li><strong>Address</strong>: 123 Security Street, 1000 Brussels, Belgium</li>
                <li><strong>Contact email</strong>: privacy@guardia-security.com</li>
              </ul>
            </div>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">2. What data do we collect?</h3>
            <p className="mb-3">
              We only collect data necessary to provide our services and ensure the security of your account.
            </p>
            
            <h4 className="font-medium mt-4 mb-2">Automatically collected data:</h4>
            <ul className="list-disc pl-5 mb-4">
              <li>IP address</li>
              <li>Device and browser information</li>
              <li>Log data (connection and activity logs)</li>
            </ul>
            
            <h4 className="font-medium mt-4 mb-2">User-provided data:</h4>
            <ul className="list-disc pl-5 mb-4">
              <li>First and last name</li>
              <li>Email address (unique for each account)</li>
              <li>Payment information (via Stripe, Mollie, or PayPal – we do not store your banking details)</li>
              <li>Account preferences and settings</li>
            </ul>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">3. Why do we collect your data?</h3>
            <p className="mb-3">We use your data only to:</p>
            <ul className="mb-4">
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Manage and secure your account</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Provide our services and ensure their proper functioning</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Improve user experience and our features</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Send you security notifications and reports</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Comply with our legal obligations and prevent fraud</span>
              </li>
            </ul>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">4. Legal basis for processing</h3>
            <p className="mb-3">We collect and process your data only when:</p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>You have given your consent</strong> (e.g., newsletter subscription)</li>
              <li><strong>Processing is necessary to perform our contract</strong> (e.g., providing an active subscription)</li>
              <li><strong>We have a legal obligation</strong> (e.g., tax and anti-fraud obligations)</li>
              <li><strong>We have a legitimate interest</strong> (e.g., improving the security of our service)</li>
            </ul>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">5. Who do we share your data with?</h3>
            <p className="mb-3 font-medium">Your data is <strong>never sold</strong>. We share it only with:</p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Payment providers</strong>: Stripe, Mollie, PayPal (for secure payment processing)</li>
              <li><strong>Hosting and infrastructure</strong>: Combell (for secure data storage)</li>
              <li><strong>Analytics services</strong>: (optional) Google Analytics, Matomo (with IP anonymization enabled)</li>
            </ul>
            <p className="mb-4">We require these partners to comply with applicable laws and protect your data.</p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">6. How long do we keep your data?</h3>
            <p className="mb-3">We keep your data only for <strong>as long as necessary</strong> to provide our services:</p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Account data</strong>: deleted <strong>6 months after termination</strong></li>
              <li><strong>Payment data</strong>: kept <strong>in accordance with legal obligations</strong></li>
              <li><strong>Connection logs</strong>: deleted after <strong>12 months</strong></li>
            </ul>
            <p className="mb-4">You can request <strong>deletion of your data</strong> at any time (see section 7).</p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">7. What are your rights?</h3>
            <p className="mb-3">In accordance with GDPR, you have the following rights:</p>
            <ul className="mb-4">
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Access</strong>: know what data we hold about you</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Rectification</strong>: correct your personal information</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Deletion</strong>: request deletion of your data (right to be forgotten)</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Objection</strong>: refuse certain processing</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Portability</strong>: retrieve your data in a readable format</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Restriction of processing</strong>: request temporary freeze of data use</span>
              </li>
            </ul>
            
            <h4 className="font-medium mt-4 mb-2">How to exercise your rights?</h4>
            <p className="mb-4">
              You can contact us at any time by email: <strong>privacy@guardia-security.com</strong><br />
              We will process your request within <strong>30 days maximum</strong>.
            </p>
            <p className="mb-4">
              If you believe we are not respecting your rights, you can file a complaint with the 
              <strong>Data Protection Authority</strong> (https://www.gegevensbeschermingsautoriteit.be).
            </p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">8. Security of your data</h3>
            <p className="mb-3">We implement <strong>strict security measures</strong> to protect your information:</p>
            <ul className="mb-4">
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Encryption of sensitive data</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Protection against attacks (firewall, 24/7 monitoring)</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Data access restricted to authorized personnel only</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Regular security audits</span>
              </li>
            </ul>
            <p className="mb-4">
              Despite these measures, <strong>no system is infallible</strong>. In case of a data breach, 
              we will inform you as soon as possible.
            </p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">9. Cookies and tracking</h3>
            <p className="mb-3">Guardia uses cookies only to:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Ensure proper website functioning (essential cookies)</li>
              <li>Remember your preferences (functional cookies)</li>
              <li>Improve performance and security (anonymized analytical cookies)</li>
            </ul>
            <p className="mb-4">
              <strong>You can refuse cookies</strong> via your browser settings or our cookie management banner.
            </p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">10. Changes to this policy</h3>
            <p className="mb-4">
              We may update this policy due to legal or technical changes. The <strong>update date</strong> 
              is indicated at the top of this page. We will inform you of any significant changes.
            </p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">11. Contact</h3>
            <p className="mb-3">If you have any questions, you can contact us at:</p>
            <p className="mb-4">
              📩 <strong>Email</strong>: privacy@guardia-security.com<br />
              📍 <strong>Postal address</strong>: 123 Security Street, 1000 Brussels, Belgium
            </p>
            
            <p className="mt-8 text-center font-medium">
              This policy fully complies with <strong>GDPR</strong> and ensures <strong>transparency</strong> regarding the use of your data.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
