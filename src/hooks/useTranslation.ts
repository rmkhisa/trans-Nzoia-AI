import { useState, useCallback, useEffect } from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

export function useTranslation() {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('aimai_language');
    return (stored as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('aimai_language', language);
  }, [language]);

  const t = useCallback(
    (key: string): string => {
      return getTranslation(language, key);
    },
    [language]
  );

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  return { t, language, setLanguage };
}
