import { Link } from 'react-router-dom';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link
            to="/"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </Link>
          <MessageSquare className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('navigation.about')}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            About AIMAI
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              AIMAI is an advanced AI assistant designed specifically for Trans-Nzoia County, Kenya.
              Our mission is to make county services more accessible to all residents by providing
              assistance in three languages: English, Swahili, and Luhya.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              What We Do
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              AIMAI helps residents of Trans-Nzoia County with:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-6">
              <li>Business registration and licensing information</li>
              <li>Agricultural extension services and market prices</li>
              <li>Health facility locations and services</li>
              <li>Education resources and bursary applications</li>
              <li>General county service inquiries</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Multilingual Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We believe that language should never be a barrier to accessing essential services.
              AIMAI supports three languages to ensure all residents can communicate comfortably:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-6">
              <li><strong>English:</strong> International language of business and education</li>
              <li><strong>Swahili:</strong> National language of Kenya</li>
              <li><strong>Luhya:</strong> Local language spoken by many Trans-Nzoia residents</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Voice & WhatsApp Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              AIMAI offers multiple ways to interact:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-6">
              <li><strong>Voice Input:</strong> Speak your questions instead of typing</li>
              <li><strong>Voice Output:</strong> Hear responses read aloud</li>
              <li><strong>WhatsApp:</strong> Chat with AIMAI directly on WhatsApp</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Technology
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              AIMAI is powered by advanced AI technology including OpenAI's GPT models for natural
              language understanding and generation. We use secure, encrypted connections to protect
              your data and conversations.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Contact Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              For questions, feedback, or support:
            </p>
            <ul className="list-none text-gray-600 dark:text-gray-300 space-y-2">
              <li>Email: info@aimai.transnzoia.go.ke</li>
              <li>Phone: +254 712 345 678</li>
              <li>Office: Trans-Nzoia County Government, Kitale</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
