export type Language = 'en' | 'sw' | 'luy';

export type Channel = 'web' | 'whatsapp';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Profile {
  id: string;
  display_name?: string;
  avatar_url?: string;
  default_language: Language;
  settings: UserSettings;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  voiceInputEnabled: boolean;
  voiceOutputEnabled: boolean;
  voiceSpeed: number;
  autoDetectLanguage?: boolean;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  language: Language;
  channel: Channel;
  status: 'active' | 'archived';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  is_voice: boolean;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  content: string;
  language: Language;
  category: string;
  subcategory?: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  source_url?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface UsageLog {
  id: string;
  user_id?: string;
  conversation_id?: string;
  language?: Language;
  channel?: Channel;
  input_tokens: number;
  output_tokens: number;
  model?: string;
  timestamp: string;
}

export interface ErrorLog {
  id: string;
  user_id?: string;
  error_type: string;
  error_code?: string;
  error_message: string;
  stack_trace?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}
