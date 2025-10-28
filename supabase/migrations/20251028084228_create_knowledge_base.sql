/*
  # Create Knowledge Base Table for Training Data

  1. New Tables
    - `knowledge_base`
      - `id` (uuid, primary key)
      - `story_id` (text)
      - `question` (text, Luhya language question)
      - `answer` (text, Luhya language answer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Indexes
    - Full-text search index on question and answer fields
    - Index on story_id for grouping related Q&A pairs

  3. Security
    - Enable RLS on knowledge_base table
    - Only authenticated users can read from knowledge base
    - Only service role can write to knowledge base
*/

CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id text NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_knowledge_base_story_id ON knowledge_base(story_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_question ON knowledge_base USING gin(to_tsvector('simple', question));
CREATE INDEX IF NOT EXISTS idx_knowledge_base_answer ON knowledge_base USING gin(to_tsvector('simple', answer));

ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read knowledge base"
  ON knowledge_base FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only service role can insert knowledge base"
  ON knowledge_base FOR INSERT
  TO service_role
  WITH CHECK (true);