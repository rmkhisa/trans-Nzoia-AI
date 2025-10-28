import { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, MessageSquare } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Message, Conversation } from '../types';
import { Button } from '../components/common/Button';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { ThemeToggle } from '../components/common/ThemeToggle';

export function Chat() {
  const { t, language, setLanguage } = useTranslation();
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      createOrLoadConversation();
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const createOrLoadConversation = async () => {
    if (!user) return;

    const { data: conversations } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (conversations && conversations.length > 0) {
      setCurrentConversation(conversations[0] as Conversation);
      loadMessages(conversations[0].id);
    } else {
      const { data: newConv } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: 'New Chat',
          language,
          channel: 'web',
        })
        .select()
        .single();

      if (newConv) {
        setCurrentConversation(newConv as Conversation);
      }
    }
  };

  const loadMessages = async (conversationId: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (data) {
      setMessages(data as Message[]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !currentConversation || !user) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    const userMsg: Partial<Message> = {
      conversation_id: currentConversation.id,
      role: 'user',
      content: userMessage,
      is_voice: false,
    };

    const { data: savedUserMsg } = await supabase
      .from('messages')
      .insert(userMsg)
      .select()
      .single();

    if (savedUserMsg) {
      setMessages((prev) => [...prev, savedUserMsg as Message]);
    }

    const assistantMsg: Partial<Message> = {
      conversation_id: currentConversation.id,
      role: 'assistant',
      content: generateMockResponse(userMessage, language),
      is_voice: false,
    };

    const { data: savedAssistantMsg } = await supabase
      .from('messages')
      .insert(assistantMsg)
      .select()
      .single();

    if (savedAssistantMsg) {
      setMessages((prev) => [...prev, savedAssistantMsg as Message]);
    }

    await supabase
      .from('conversations')
      .update({
        updated_at: new Date().toISOString(),
        title: userMessage.slice(0, 50)
      })
      .eq('id', currentConversation.id);

    setLoading(false);
  };

  const generateMockResponse = (userMessage: string, lang: string): string => {
    const responses = {
      en: {
        greeting: "Hello! I'm AIMAI, your Trans-Nzoia County assistant. How can I help you today?",
        business: "To register a business in Trans-Nzoia County, visit the County Business Registration Office at Kitale Town Hall with your ID, KRA PIN, and business name certificate. The fee is KES 2,000.",
        default: "Thank you for your question. As a demo version, I'm providing simulated responses. In the full version, I would connect to OpenAI to provide accurate, helpful answers about Trans-Nzoia County services.",
      },
      sw: {
        greeting: "Habari! Mimi ni AIMAI, msaidizi wako wa Kaunti ya Trans-Nzoia. Naweza kukusaidiaje leo?",
        business: "Kusajili biashara katika Kaunti ya Trans-Nzoia, tembelea Ofisi ya Usajili wa Biashara ya Kaunti katika Kitale Town Hall na kitambulisho chako, KRA PIN, na hati ya jina la biashara. Ada ni KES 2,000.",
        default: "Asante kwa swali lako. Kama toleo la onyesho, ninatoa majibu ya simulizi. Katika toleo kamili, ningaunganisha na OpenAI kutoa majibu sahihi na ya kusaidia kuhusu huduma za Kaunti ya Trans-Nzoia.",
      },
      luy: {
        greeting: "Muraa olayi! Ndi AIMAI, omusaali wakho wa Trans-Nzoia County. Ndakhona okhukhutsaalisia okhukhuluhi lero?",
        business: "Okhuyandikha bikonoomu khuli Trans-Nzoia County, echa khu Ofisi ya Okhuyandikha Ebikonoomu ya Kaundi khuli Kitale Town Hall nende echitambuliso chakho, KRA PIN, nende echitabo cha lisina lya bikonoomu. Endere yene KES 2,000.",
        default: "Namusikha khumuchaale kwakho. Khulia demo version, ndikhola okhukhola obulaali bwa simulizi. Khu version yamusyene, ndekhola okhukamanyikha na OpenAI okhukhola majibu ke amalaala nende okhutsaalisia khubukali ebikholi ebya Trans-Nzoia County.",
      },
    };

    const langResponses = responses[lang as keyof typeof responses] || responses.en;

    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('habari') || userMessage.toLowerCase().includes('muraa')) {
      return langResponses.greeting;
    }

    if (userMessage.toLowerCase().includes('business') || userMessage.toLowerCase().includes('biashara') || userMessage.toLowerCase().includes('bikonoomu')) {
      return langResponses.business;
    }

    return langResponses.default;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentConversation?.title || 'AIMAI Chat'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector current={language} onChange={setLanguage} />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">{t('chat.welcome')}</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-3 rounded-lg transition-colors ${
                isRecording
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chat.typeMessage')}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Button onClick={sendMessage} disabled={!input.trim() || loading}>
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
