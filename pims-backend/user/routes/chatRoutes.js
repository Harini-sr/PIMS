const express = require("express");
const router = express.Router();
const { OpenAIEmbeddings } = require("@langchain/openai");
const { OpenAI } = require("openai");
const Knowledge = require("../models/knowledge");

require("dotenv").config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const embeddings = new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY });

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const queryEmbedding = await embeddings.embedQuery(query);
    const allDocs = await Knowledge.find({});
    if (!allDocs.length) return res.json({ answer: "No knowledge data available yet." });

    const similarities = allDocs.map(doc => ({
      doc,
      score: cosineSimilarity(doc.embedding, queryEmbedding),
    }));

    const topDocs = similarities.sort((a, b) => b.score - a.score).slice(0, 3);
    const context = topDocs.map(d => d.doc.text).join("\n\n");

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant using provided context." },
        { role: "user", content: `Context:\n${context}\n\nQuestion: ${query}` },
      ],
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chatbot error" });
  }
});

module.exports = router;
