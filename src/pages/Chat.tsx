import { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, MessageSquare, Plus, LogOut } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Message, Conversation } from '../types';
import { Button } from '../components/common/Button';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { ThemeToggle } from '../components/common/ThemeToggle';

export function Chat() {
  const { t, language, setLanguage } = useTranslation();
  const { user, signOut } = useAuth();
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

    try {
      const conversationMessages = messages.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
      }));

      conversationMessages.push({
        role: 'user',
        content: userMessage,
      });

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationMessages,
          language,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to get response from AI');
      }

      const assistantMsg: Partial<Message> = {
        conversation_id: currentConversation.id,
        role: 'assistant',
        content: result.message,
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
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMsg: Partial<Message> = {
        conversation_id: currentConversation.id,
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        is_voice: false,
      };

      const { data: savedErrorMsg } = await supabase
        .from('messages')
        .insert(errorMsg)
        .select()
        .single();

      if (savedErrorMsg) {
        setMessages((prev) => [...prev, savedErrorMsg as Message]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const createNewChat = async () => {
    if (!user) return;

    if (currentConversation) {
      await supabase
        .from('conversations')
        .update({ status: 'archived' })
        .eq('id', currentConversation.id);
    }

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
      setMessages([]);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
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
              <button
                onClick={createNewChat}
                className="p-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                title="New Chat"
              >
                <Plus size={20} />
              </button>
              <LanguageSelector current={language} onChange={setLanguage} />
              <ThemeToggle />
              <button
                onClick={handleSignOut}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 transition-colors"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">{t('chat.welcome')}</p>
              <p className="text-sm max-w-md mx-auto">
                {language === 'en' && 'Ask me anything about Trans-Nzoia County services, procedures, or general questions.'}
                {language === 'sw' && 'Niulize chochote kuhusu huduma za Kaunti ya Trans-Nzoia, taratibu, au maswali ya jumla.'}
                {language === 'luy' && 'Nichaale ekindu chosi khubukali ebikholi ebya Trans-Nzoia County, emirembe, okhandi emiswaali eminandi.'}
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl rounded-lg px-4 py-3 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t('chat.typeMessage')}
              rows={1}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none max-h-32 overflow-y-auto"
              style={{ minHeight: '44px' }}
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
