
import en from './en';
import fr from './fr';
import es from './es';
import de from './de';
import it from './it';
import type { TranslationKeys } from './types';

export type Language = 'fr' | 'en' | 'es' | 'de' | 'it';

// Export all translations in a single object
export const translations: Record<Language, TranslationKeys> = {
  en,
  fr,
  es,
  de,
  it
};

export type { TranslationKeys };
