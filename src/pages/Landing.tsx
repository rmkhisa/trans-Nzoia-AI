import { Link } from 'react-router-dom';
import { MessageSquare, Globe, Mic, Phone } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/common/Button';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { ThemeToggle } from '../components/common/ThemeToggle';

export function Landing() {
  const { t, language, setLanguage } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AIMAI</h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector current={language} onChange={setLanguage} />
          <ThemeToggle />
          <Link to="/chat">
            <Button>{t('landing.hero.cta')}</Button>
          </Link>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {t('landing.hero.title')}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {t('landing.hero.subtitle')}
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/chat">
            <Button size="lg">{t('landing.hero.cta')}</Button>
          </Link>
          <Button size="lg" variant="outline">
            {t('landing.hero.learnMore')}
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t('landing.features.title')}
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <Globe className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('landing.features.multilingual.title')}
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {t('landing.features.multilingual.description')}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <Mic className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('landing.features.voice.title')}
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {t('landing.features.voice.description')}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <Phone className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('landing.features.whatsapp.title')}
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {t('landing.features.whatsapp.description')}
            </p>
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <Link to="/about" className="hover:text-teal-600 dark:hover:text-teal-400">
            {t('navigation.about')}
          </Link>
          <Link to="/help" className="hover:text-teal-600 dark:hover:text-teal-400">
            {t('navigation.help')}
          </Link>
          <Link to="/privacy" className="hover:text-teal-600 dark:hover:text-teal-400">
            {t('navigation.privacy')}
          </Link>
          <Link to="/terms" className="hover:text-teal-600 dark:hover:text-teal-400">
            {t('navigation.terms')}
          </Link>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-500 mt-4">
          © 2024 AIMAI - Trans-Nzoia County
        </p>
      </footer>
    </div>
  );
}
