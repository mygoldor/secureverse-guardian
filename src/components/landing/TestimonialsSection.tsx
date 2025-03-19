
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface TestimonialProps {
  quoteKey: string;
  nameKey: string;
  titleKey: string;
}

const Testimonial = ({ quoteKey, nameKey, titleKey }: TestimonialProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-[#F5F5F5] p-6 rounded-xl shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
        </div>
        <p className="text-gray-600 italic">{t(quoteKey)}</p>
        <div>
          <p className="font-bold text-[#003366]">{t(nameKey)}</p>
          <p className="text-sm text-gray-500">{t(titleKey)}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      quoteKey: 'testimonial_quote_1',
      nameKey: 'testimonial_name_1',
      titleKey: 'testimonial_title_1'
    },
    {
      quoteKey: 'testimonial_quote_2',
      nameKey: 'testimonial_name_2',
      titleKey: 'testimonial_title_2'
    },
    {
      quoteKey: 'testimonial_quote_3',
      nameKey: 'testimonial_name_3',
      titleKey: 'testimonial_title_3'
    }
  ];
  
  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003366] text-center mb-12">{t('testimonials_title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quoteKey={testimonial.quoteKey}
              nameKey={testimonial.nameKey}
              titleKey={testimonial.titleKey}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button className="bg-[#0099FF] hover:bg-[#007ACC] text-white">
            {t('get_started')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
