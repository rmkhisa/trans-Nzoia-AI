import { Link } from 'react-router-dom';
import { MessageSquare, ArrowLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const faqs = [
  {
    question: {
      en: 'How do I start using AIMAI?',
      sw: 'Jinsi ya kuanza kutumia AIMAI?',
      luy: 'Okhukhuluhi okho ndakhola okhuchaka okhukhola AIMAI?',
    },
    answer: {
      en: 'Simply click "Start Chatting" on the homepage or navigate to the Chat page. You can type your questions or use voice input by clicking the microphone icon.',
      sw: 'Bonyeza tu "Anza Mazungumzo" kwenye ukurasa wa nyumbani au nenda kwenye ukurasa wa Mazungumzo. Unaweza kuandika maswali yako au kutumia sauti kwa kubonyeza ikoni ya kipaza sauti.',
      luy: 'Bonyesa fela "Chaka Khuloma" khu khaya okhandi echa khu peeji ya Emisango. Okhola okhandikha emiswaale chiakho okhandi okhukola litsembo khukhubonyesa ikoni ya kipaza sauti.',
    },
  },
  {
    question: {
      en: 'What languages does AIMAI support?',
      sw: 'AIMAI inasaidia lugha gani?',
      luy: 'AIMAI yikhola enyeso nesi?',
    },
    answer: {
      en: 'AIMAI supports three languages: English, Swahili (Kiswahili), and Luhya. You can switch languages at any time using the language selector.',
      sw: 'AIMAI inasaidia lugha tatu: Kiingereza, Kiswahili, na Kiluhya. Unaweza kubadilisha lugha wakati wowote ukitumia kichaguo cha lugha.',
      luy: 'AIMAI yikhola enyeso esaru: English, Swahili, nende Luhya. Okhola okhusalula olunyala wakhe owakhi okhukola kichaguo cha olunyala.',
    },
  },
  {
    question: {
      en: 'Can I use voice input?',
      sw: 'Naweza kutumia sauti?',
      luy: 'Ndakhola okhukola litsembo?',
    },
    answer: {
      en: 'Yes! Click the microphone icon in the chat interface to use voice input. You\'ll need to grant microphone permissions to your browser. Voice input works in all supported languages.',
      sw: 'Ndio! Bonyeza ikoni ya kipaza sauti kwenye kiolesura cha mazungumzo kutumia sauti. Utahitaji kutoa ruhusa za kipaza sauti kwa kivinjari chako. Sauti inafanya kazi katika lugha zote zinazosaidiwa.',
      luy: 'Ee! Bonyesa ikoni ya kipaza sauti khu interface ya emisango okhukola litsembo. Okhuyakha okhukhola okhukhola ruhusa ya kipaza sauti khu kivinjari chiakho. Litsembo likhola khu enyeso chiosi.',
    },
  },
  {
    question: {
      en: 'How do I use AIMAI on WhatsApp?',
      sw: 'Jinsi ya kutumia AIMAI kwenye WhatsApp?',
      luy: 'Okhukhuluhi okho ndakhola okhukola AIMAI khu WhatsApp?',
    },
    answer: {
      en: 'Save AIMAI\'s WhatsApp number (+254 XXX XXX XXX) to your contacts and send a message to start chatting. You can send both text messages and voice notes.',
      sw: 'Hifadhi nambari ya WhatsApp ya AIMAI (+254 XXX XXX XXX) kwenye anwani zako na utume ujumbe kuanza mazungumzo. Unaweza kutuma ujumbe wa maandishi na sauti.',
      luy: 'Terekesia namba ya WhatsApp ya AIMAI (+254 XXX XXX XXX) khu anwani chiakho nende osume omusango okhuchaka khuloma. Okhola okhusuma amasango ke ebikhuluho nende litsembo.',
    },
  },
];

export function Help() {
  const { t, language } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            {t('navigation.help')}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white">
                  {faq.question[language]}
                </span>
                <ChevronDown
                  className={`text-gray-400 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  size={20}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer[language]}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-teal-900 dark:text-teal-100 mb-2">
            Still need help?
          </h3>
          <p className="text-teal-700 dark:text-teal-300 mb-4">
            Contact our support team for additional assistance.
          </p>
          <ul className="space-y-2 text-teal-800 dark:text-teal-200">
            <li>Email: support@aimai.transnzoia.go.ke</li>
            <li>Phone: +254 712 345 678</li>
            <li>Office Hours: Monday - Friday, 8:00 AM - 5:00 PM</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
