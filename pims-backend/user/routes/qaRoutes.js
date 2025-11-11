// // // // // // const express = require("express");
// // // // // // const router = express.Router();
// // // // // // const Knowledge = require("../models/knowledge");

// // // // // // // Chat endpoint at /api/chat
// // // // // // router.post("/chat", async (req, res) => {
// // // // // //   const { message } = req.body; // match Angular { message: string }

// // // // // //   try {
// // // // // //     const results = await Knowledge.find({
// // // // // //       text: { $regex: message, $options: "i" },
// // // // // //     });

// // // // // //     if (results.length > 0) {
// // // // // //       res.json({ answer: results[0].text });
// // // // // //     } else {
// // // // // //       res.json({ answer: "Sorry, I don't have an answer for that." });
// // // // // //     }
// // // // // //   } catch (err) {
// // // // // //     console.error("❌ Error:", err);
// // // // // //     res.status(500).json({ error: "Server error" });
// // // // // //   }
// // // // // // });

// // // // // // module.exports = router;


// // // // // const express = require("express");
// // // // // const router = express.Router();
// // // // // const Knowledge = require("../models/knowledge");

// // // // // // Chat endpoint at /api/chat
// // // // // router.post("/chat", async (req, res) => {
// // // // //   const { message } = req.body;

// // // // //   try {
// // // // //     // Search for keywords in the knowledge base
// // // // //     const results = await Knowledge.find({
// // // // //       text: { $regex: message, $options: "i" },
// // // // //     });

// // // // //     if (results.length > 0) {
// // // // //       res.json({ answer: results[0].text });
// // // // //     } else {
// // // // //       // Fallback dynamic response
// // // // //       const dynamicResponses = [
// // // // //         "Interesting! Can you tell me more?",
// // // // //         "I'm not sure about that. Could you clarify?",
// // // // //         "Let's explore that further together.",
// // // // //         "Hmm, I don't have the info yet. Want to try another question?",
// // // // //       ];

// // // // //       // Pick a random fallback response
// // // // //       const answer =
// // // // //         dynamicResponses[Math.floor(Math.random() * dynamicResponses.length)];

// // // // //       res.json({ answer });
// // // // //     }
// // // // //   } catch (err) {
// // // // //     console.error("❌ Error:", err);
// // // // //     res.status(500).json({ error: "Server error" });
// // // // //   }
// // // // // });

// // // // // module.exports = router;

// // // // const express = require("express");
// // // // const router = express.Router();
// // // // const Knowledge = require("../models/knowledge");

// // // // // POST /api/chat
// // // // router.post("/chat", async (req, res) => {
// // // //   const { message } = req.body;

// // // //   try {
// // // //     const lowerMsg = message.toLowerCase();
// // // //     let answer = "";

// // // //     // 1️⃣ Keyword-based dynamic responses for User Module
// // // //     if (lowerMsg.includes("create") && lowerMsg.includes("issue")) {
// // // //       answer = "To submit a new issue, go to the 'Report Issue' page, fill out the form, and click Submit.";
// // // //     } else if (lowerMsg.includes("view") && lowerMsg.includes("issues")) {
// // // //       answer = "You can view your submitted issues on your Dashboard under the 'Issues' section.";
// // // //     } else if (lowerMsg.includes("update") && lowerMsg.includes("profile")) {
// // // //       answer = "To update your profile, navigate to the 'Profile' page from your Dashboard and edit your information.";
// // // //     } else if (lowerMsg.includes("reset") && lowerMsg.includes("password")) {
// // // //       answer = "You can reset your password by clicking 'Forgot Password' on the login page.";
// // // //     } else if (lowerMsg.includes("logout")) {
// // // //       answer = "To logout, click the Logout button on your Dashboard.";
// // // //     } else if (lowerMsg.includes("feedback")) {
// // // //       answer = "To submit feedback, go to the Feedback page, write your message, and click Submit.";
// // // //     } else if (lowerMsg.includes("login")) {
// // // //       answer = "To login, use your username and password on the Login page.";
// // // //     } else {
// // // //       // 2️⃣ Search Knowledge DB for matching questions
// // // //       const results = await Knowledge.find({
// // // //         text: { $regex: message, $options: "i" },
// // // //       });

// // // //       if (results.length > 0) {
// // // //         answer = results[0].text;
// // // //       } else {
// // // //         // 3️⃣ Random fallback responses
// // // //         const dynamicResponses = [
// // // //           "Interesting! Can you tell me more?",
// // // //           "I'm not sure about that. Could you clarify?",
// // // //           "Let's explore that further together.",
// // // //         ];
// // // //         answer =
// // // //           dynamicResponses[Math.floor(Math.random() * dynamicResponses.length)];

// // // //         // Optional: store unknown question for future learning
// // // //         await Knowledge.create({ text: message, tags: [] });
// // // //       }
// // // //     }

// // // //     res.json({ answer });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ error: "Server error" });
// // // //   }
// // // // });

// // // // module.exports = router;



// // // // const express = require("express");
// // // // const router = express.Router();
// // // // const { Knowledge } = require("../models/knowledge");
// // // // const { Configuration, OpenAIApi } = require("openai");
// // // // require("dotenv").config();

// // // // const openai = new OpenAIApi(
// // // //   new Configuration({ apiKey: process.env.OPENAI_API_KEY })
// // // // );

// // // // router.post("/chat", async (req, res) => {
// // // //   try {
// // // //     const { message } = req.body;

// // // //     if (!message) return res.status(400).json({ error: "Message is required" });

// // // //     // 1️⃣ Fetch all knowledge entries from MongoDB as context
// // // //     const knowledgeEntries = await Knowledge.find({});
// // // //     const knowledgeText = knowledgeEntries.map(k => k.text).join("\n");

// // // //     // 2️⃣ Send to OpenAI GPT with context
// // // //     const response = await openai.createChatCompletion({
// // // //       model: "gpt-4",
// // // //       messages: [
// // // //         {
// // // //           role: "system",
// // // //           content: `You are a helpful assistant. Use the following knowledge base to answer questions:\n${knowledgeText}`,
// // // //         },
// // // //         { role: "user", content: message },
// // // //       ],
// // // //       max_tokens: 300,
// // // //     });

// // // //     const answer = response.data.choices[0].message.content;

// // // //     // Optional: store the question in MongoDB for future learning
// // // //     await Knowledge.create({ text: message, tags: [] });

// // // //     res.json({ answer });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ error: "Server error" });
// // // //   }
// // // // });

// // // // module.exports = router;
// // // const express = require("express");
// // // const router = express.Router();
// // // const { Knowledge } = require("../models/knowledge");
// // // const { OpenAI } = require("openai");
// // // require("dotenv").config();

// // // const openai = new OpenAI({
// // //   apiKey: process.env.OPENAI_API_KEY
// // // });

// // // router.post("/chat", async (req, res) => {
// // //   try {
// // //     const { message } = req.body;
// // //     if (!message) return res.status(400).json({ error: "Message is required" });

// // //     // 1️⃣ Fetch all knowledge entries from MongoDB as context
// // //     let knowledgeText = "";
// // //     try {
// // //       const knowledgeEntries = await Knowledge.find({});
// // //       knowledgeText = knowledgeEntries.map(k => k.text).join("\n");
// // //     } catch (mongoErr) {
// // //       console.error("Failed to fetch knowledge from MongoDB:", mongoErr);
// // //     }

// // //     // 2️⃣ Call OpenAI API
// // //     let answer = "No response from OpenAI";
// // //     try {
// // //       const response = await openai.chat.completions.create({
// // //         model: "gpt-3.5-turbo",
// // //         messages: [
// // //           {
// // //             role: "system",
// // //             content: `You are a helpful assistant. Use the following knowledge base to answer questions:\n${knowledgeText}`,
// // //           },
// // //           { role: "user", content: message },
// // //         ],
// // //         max_tokens: 300,
// // //       });

// // //       answer = response.choices?.[0]?.message?.content || answer;
// // //     } catch (openaiErr) {
// // //       console.error("OpenAI API error:", openaiErr);
// // //       if (openaiErr.response?.data) console.error("OpenAI response data:", openaiErr.response.data);
// // //     }

// // //     // 3️⃣ Store the user message in MongoDB for future learning
// // //     try {
// // //       await Knowledge.create({ text: message, tags: [] });
// // //     } catch (mongoCreateErr) {
// // //       console.error("Failed to store user message in MongoDB:", mongoCreateErr);
// // //     }

// // //     res.json({ answer });
// // //   } catch (err) {
// // //     console.error("Unexpected server error:", err);
// // //     res.status(500).json({ error: err.message || "Server error" });
// // //   }
// // // });

// // // module.exports = router;


// // const express = require("express");
// // const router = express.Router();
// // const { Knowledge } = require("../models/knowledge");
// // const { OpenAI } = require("openai");
// // require("dotenv").config();

// // // Initialize OpenAI client
// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY
// // });

// // // POST /api/chat
// // router.post("/chat", async (req, res) => {
// //   try {
// //     const { message } = req.body;

// //     if (!message) {
// //       return res.status(400).json({ error: "Message is required" });
// //     }

// //     // 1️⃣ Fetch all knowledge entries from MongoDB
// //     let knowledgeText = "";
// //     try {
// //       const knowledgeEntries = await Knowledge.find({});
// //       if (knowledgeEntries.length) {
// //         knowledgeText = knowledgeEntries.map(k => k.text).join("\n");
// //       } else {
// //         console.warn("Knowledge base is empty.");
// //       }
// //     } catch (mongoErr) {
// //       console.error("Failed to fetch knowledge from MongoDB:", mongoErr);
// //     }

// //     // 2️⃣ Call OpenAI API
// //     let answer = "No response from OpenAI";
// //     try {
// //       const response = await openai.chat.completions.create({
// //         model: "text-davinci-003", // Make sure your key has access to this model
// //         messages: [
// //           {
// //             role: "system",
// //             content: `You are a helpful assistant. Use the following knowledge base to answer questions:\n${knowledgeText}`,
// //           },
// //           { role: "user", content: message },
// //         ],
// //         max_tokens: 300,
// //       });

// //       answer = response.choices?.[0]?.message?.content || answer;
// //     } catch (openaiErr) {
// //       console.error("OpenAI API error:", openaiErr);

// //       // If model access is denied, provide a meaningful message
// //       if (openaiErr.code === "model_not_found" || openaiErr.status === 403) {
// //         answer = "The current OpenAI API key does not have access to this model.";
// //       }

// //       if (openaiErr.response?.data) {
// //         console.error("OpenAI response data:", openaiErr.response.data);
// //       }
// //     }

// //     // 3️⃣ Optionally store the user message in MongoDB
// //     try {
// //       await Knowledge.create({ text: message, tags: [] });
// //     } catch (mongoCreateErr) {
// //       console.error("Failed to store user message in MongoDB:", mongoCreateErr);
// //     }

// //     // 4️⃣ Return the answer
// //     res.json({ answer });

// //   } catch (err) {
// //     console.error("Unexpected server error:", err);
// //     res.status(500).json({ error: err.message || "Server error" });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { Knowledge } = require("../models/knowledge");
// const { OpenAI } = require("openai");
// require("dotenv").config();

// // Initialize OpenAI client
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // POST /api/chat
// router.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) return res.status(400).json({ error: "Message is required" });

//     // 1️⃣ Fetch relevant knowledge entries (case-insensitive match on message words)
//     let knowledgeText = "";
//     try {
//       const regex = new RegExp(message.split(" ").join("|"), "i");
//       const knowledgeEntries = await Knowledge.find({ text: { $regex: regex } }).limit(5);

//       if (knowledgeEntries.length) {
//         knowledgeText = knowledgeEntries.map(k => k.text).join("\n");
//       } else {
//         console.warn("No matching knowledge entries found. Sending general response.");
//       }
//     } catch (mongoErr) {
//       console.error("Failed to fetch knowledge from MongoDB:", mongoErr);
//     }

//     // 2️⃣ Call OpenAI GPT-3.5-turbo
//     let answer = "No response from OpenAI";
//     try {
//   response = await openai.chat.completions.create({
//     model: "gpt-4.1",
//     messages: messages,
//   });
// } catch (err) {
//   if (err.code === "insufficient_quota" || err.status === 429) {
//     console.log("Falling back to gpt-3.5-turbo-1106 due to quota limits.");
//     response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo-1106",
//       messages: messages,
//     });
//   } else {
//     throw err;
//   }
// }


//     // 3️⃣ Store user message and bot response in MongoDB
//     try {
//       await Knowledge.create({ text: message, tags: ["user"] });
//       await Knowledge.create({ text: answer, tags: ["bot"] });
//     } catch (mongoCreateErr) {
//       console.error("Failed to store messages in MongoDB:", mongoCreateErr);
//     }

//     // 4️⃣ Return response
//     res.json({ answer });
//   } catch (err) {
//     console.error("Unexpected server error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { Knowledge } = require("../models/knowledge");
const { OpenAI } = require("openai");
require("dotenv").config();

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/chat
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // 1️⃣ Fetch relevant knowledge entries
    let knowledgeText = "";
    try {
      const regex = new RegExp(message.split(" ").join("|"), "i");
      const knowledgeEntries = await Knowledge.find({ text: { $regex: regex } }).limit(5);

      if (knowledgeEntries.length) {
        knowledgeText = knowledgeEntries.map(k => k.text).join("\n");
      }
    } catch (mongoErr) {
      console.error("Failed to fetch knowledge from MongoDB:", mongoErr);
    }

    // 2️⃣ Prepare messages array
    const messages = [
      { role: "system", content: "You are a helpful assistant. Use the knowledge base to answer user questions." },
      { role: "user", content: `Knowledge:\n${knowledgeText}\nUser question: ${message}` },
    ];

    // 3️⃣ Call OpenAI GPT
    let answer = "No response from OpenAI";
    try {
      let response;
      try {
        response = await openai.chat.completions.create({
          model: "gpt-4.1",
          messages,
          max_tokens: 300,
          temperature: 0.7,
        });
      } catch (err) {
        if (err.code === "insufficient_quota" || err.status === 429) {
          console.log("Falling back to gpt-3.5-turbo-1106 due to quota limits.");
          response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages,
            max_tokens: 300,
            temperature: 0.7,
          });
        } else {
          throw err;
        }
      }

      answer = response.choices?.[0]?.message?.content?.trim() || answer;
    } catch (openaiErr) {
      console.error("OpenAI API error:", openaiErr);
      answer = "OpenAI API error. Check model access or API key.";
    }

    // 4️⃣ Store user message and bot response in MongoDB
    try {
      await Knowledge.create({ text: message, tags: ["user"] });
      await Knowledge.create({ text: answer, tags: ["bot"] });
    } catch (mongoCreateErr) {
      console.error("Failed to store messages in MongoDB:", mongoCreateErr);
    }

    // 5️⃣ Return response
    res.json({ answer });
  } catch (err) {
    console.error("Unexpected server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
