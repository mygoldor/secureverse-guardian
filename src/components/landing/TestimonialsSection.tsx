
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  index: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, title, index }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-[#0099FF] rounded-full flex items-center justify-center text-white font-bold text-xl">
          {name.charAt(0)}
        </div>
        <div className="ml-4">
          <p className="font-semibold text-[#003366]">{name}</p>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 bg-[#F5F8FF]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003366] mb-12">{t('testimonials_title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial 
            quote={t('testimonial_quote_1')}
            name={t('testimonial_name_1')}
            title={t('testimonial_title_1')}
            index={1}
          />
          <Testimonial 
            quote={t('testimonial_quote_2')}
            name={t('testimonial_name_2')}
            title={t('testimonial_title_2')}
            index={2}
          />
          <Testimonial 
            quote={t('testimonial_quote_3')}
            name={t('testimonial_name_3')}
            title={t('testimonial_title_3')}
            index={3}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
