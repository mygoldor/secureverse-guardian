
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield } from 'lucide-react';

const CtaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-green-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-white opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta_title')}
          </h2>
          <p className="text-xl mb-10 text-green-100">
            {t('cta_subtitle')}
          </p>
          <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50">
            <Link to="/signup">
              {t('signup_now')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
