import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import OpenAI from "npm:openai@4.47.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  language: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const openai = new OpenAI({
      apiKey: Deno.env.get("OPENAI_API_KEY"),
    });

    const { messages, language }: ChatRequest = await req.json();

    const systemPrompts = {
      en: "You are AIMAI, a helpful AI assistant for Trans-Nzoia County in Kenya. Provide accurate, helpful information about county services, procedures, and general assistance. Be friendly and professional.",
      sw: "Wewe ni AIMAI, msaidizi wa AI wa kusaidia kwa Kaunti ya Trans-Nzoia nchini Kenya. Toa taarifa sahihi na za kusaidia kuhusu huduma za kaunti, taratibu, na msaada wa jumla. Kuwa rafiki na kitaaluma.",
      luy: "Uli AIMAI, omusaali wa AI wa okhutsaalisia Trans-Nzoia Countykhuli Kenya. Khola obubakali obwamalaala nende obwa okhutsaalisia khubukali ebikholi ebya kaundi, emirembe, nende enyakho yosi. Khola omulafu nende professional.",
    };

    const systemMessage: ChatMessage = {
      role: "system",
      content: systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en,
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseMessage = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    return new Response(
      JSON.stringify({
        success: true,
        message: responseMessage,
        usage: completion.usage,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in chat function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});