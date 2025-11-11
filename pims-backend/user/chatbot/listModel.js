import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModel() {
  try {
    // Replace with a model your project can access after enabling Generative AI API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5" });

    const result = await model.generateContent({
      prompt: "Hello, can you introduce yourself?",
    });

    console.log(result.response.text());
  } catch (err) {
    console.error("❌ Model test error:", err);
  }
}

testModel();
