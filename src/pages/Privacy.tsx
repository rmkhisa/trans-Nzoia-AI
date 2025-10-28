import { Link } from 'react-router-dom';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export function Privacy() {
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
            {t('navigation.privacy')}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: January 2024
          </p>

          <div className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                1. Information We Collect
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Account information (email, name)</li>
                <li>Conversation messages and chat history</li>
                <li>Voice recordings when you use voice input</li>
                <li>Language preferences and settings</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                2. How We Use Your Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Provide and improve AIMAI services</li>
                <li>Process and respond to your inquiries</li>
                <li>Personalize your experience</li>
                <li>Analyze usage patterns and improve our AI models</li>
                <li>Communicate with you about updates and features</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                3. Data Storage and Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is stored securely using industry-standard encryption. We use Supabase
                for data storage, which provides enterprise-grade security and compliance. All
                connections are encrypted using SSL/TLS.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                4. Third-Party Services
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                AIMAI uses the following third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li><strong>OpenAI:</strong> For AI language processing</li>
                <li><strong>Supabase:</strong> For data storage and authentication</li>
                <li><strong>WhatsApp Business API:</strong> For WhatsApp integration</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                These services have their own privacy policies and data handling practices.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                5. Your Rights
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your conversation history</li>
                <li>Opt-out of data collection</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                6. Data Retention
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We retain your conversation history for as long as your account is active, unless
                you choose to delete it. You can delete individual conversations or clear all
                history at any time from the Settings page.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                7. Children's Privacy
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                AIMAI is not intended for children under 13 years of age. We do not knowingly
                collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                8. Changes to This Policy
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this privacy policy from time to time. We will notify you of any
                changes by posting the new privacy policy on this page and updating the "Last
                updated" date.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                9. Contact Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                If you have questions about this privacy policy, please contact us:
              </p>
              <ul className="list-none text-gray-600 dark:text-gray-300 space-y-2 ml-4 mt-2">
                <li>Email: privacy@aimai.transnzoia.go.ke</li>
                <li>Phone: +254 712 345 678</li>
                <li>Address: Trans-Nzoia County Government, Kitale, Kenya</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
