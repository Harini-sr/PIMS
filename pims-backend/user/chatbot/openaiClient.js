import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY not found in .env");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

export async function askOpenAI(question) {
  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("❌ Error in askOpenAI:", err);
    const errMsg = err?.error?.message || err?.message || 'Unknown error';
    if (err?.code === 'model_not_found' || (errMsg && errMsg.includes('does not have access to model'))) {
      // Try to list available models to help the caller choose an alternative
      try {
        const modelsList = await openai.models.list();
        const modelIds = (modelsList?.data || []).map(m => m.id).slice(0, 50);
        console.error('Available models (up to 50):', modelIds);
        return `Model access error: ${errMsg}. Available models (sample): ${modelIds.join(', ')}. Please set OPENAI_MODEL to one of these or use a different API key.`;
      } catch (listErr) {
        console.error('Failed to list models:', listErr?.message || listErr);
        return `Model access error: ${errMsg}. Could not list available models (permission issue). Please use a different API key or contact OpenAI support.`;
      }
    }
    if (err.code === "insufficient_quota") {
      return "Sorry, the server has run out of OpenAI quota. Please try again later.";
    }
    return `Sorry, I could not process your request: ${errMsg}`;
  }
}
