import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface KnowledgeEntry {
  Story_ID: string;
  Q: string;
  A: string;
}

async function importKnowledge() {
  const csvPath = path.join(process.cwd(), 'KenLumachiQuAD.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');

  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');

  const entries: { story_id: string; question: string; answer: string }[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',');
    if (values.length >= 3) {
      entries.push({
        story_id: values[0].trim(),
        question: values[1].trim(),
        answer: values[2].trim(),
      });
    }
  }

  console.log(`Importing ${entries.length} knowledge entries...`);

  const batchSize = 100;
  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    const { error } = await supabase.from('knowledge_base').insert(batch);

    if (error) {
      console.error(`Error importing batch ${i / batchSize + 1}:`, error);
    } else {
      console.log(`Imported batch ${i / batchSize + 1} (${batch.length} entries)`);
    }
  }

  console.log('Import completed!');
}

importKnowledge().catch(console.error);
