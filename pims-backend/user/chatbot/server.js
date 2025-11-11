// // import 'dotenv/config'; // automatically loads .env
// // import express from 'express';
// // import OpenAI from 'openai';

// // const app = express();
// // app.use(express.json());

// // // OpenAI configuration
// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });
// // const MODEL = 'gpt-3.5-turbo-1106';

// // // Endpoint to chat with AI
// // app.post('/chat', async (req, res) => {
// //   try {
// //     const { message } = req.body;
// //     if (!message) return res.status(400).json({ error: "Message is required" });

// //     const response = await openai.chat.completions.create({
// //       model: MODEL,
// //       messages: [{ role: "user", content: message }],
// //     });

// //     const aiMessage = response.choices?.[0]?.message?.content;
// //     res.json({ reply: aiMessage });
// //   } catch (error) {
// //     console.error(error);
// //     // If model is not available to the project, surface a helpful message
// //     const errMsg = error?.error?.message || error?.message || 'Something went wrong';
// //     if (error?.code === 'model_not_found' || (errMsg && errMsg.includes('does not have access to model'))) {
// //       // Try to list available models to help debugging (may fail if key lacks permission)
// //       try {
// //         const modelsList = await openai.models.list();
// //         const modelIds = (modelsList?.data || []).map(m => m.id).slice(0, 50);
// //         console.error('Available models (up to 50):', modelIds);
// //         return res.status(403).json({
// //           error: 'model_not_found',
// //           message: errMsg,
// //           availableModels: modelIds,
// //           help: 'Your OpenAI project/key does not have access to the requested model. Use one of the availableModels above or use a different API key. You can set OPENAI_MODEL in the .env to change the model.'
// //         });
// //       } catch (listErr) {
// //         console.error('Failed to list models:', listErr?.message || listErr);
// //         return res.status(403).json({
// //           error: 'model_not_found',
// //           message: errMsg,
// //           help: 'Your OpenAI project/key does not have access to the requested model. Try using a different API key or contact OpenAI support to grant model access. You can set OPENAI_MODEL in the .env to change the model.'
// //         });
// //       }
// //     }

// //     res.status(500).json({ error: errMsg });
// //   }
// // });

// // // Start server
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import fetch from 'node-fetch';
// import OpenAI from 'openai';

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin: '*', // You can restrict to your Angular domain later
//   credentials: true
// }));

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo-1106';

// /**
//  * MAIN CHATBOT ENDPOINT
//  * POST /ask
//  */
// app.post('/ask', async (req, res) => {
//   try {
//     const { question, userId } = req.body;
//     if (!question) return res.status(400).json({ error: 'Question is required' });

//     // 🔹 Fetch user details and issues dynamically from your PIMS backend
//     let userData = null;
//     let userIssues = [];
//     try {
//       if (userId) {
//         const issuesRes = await fetch(`https://pims-application.onrender.com/api/user/issues?userId=${userId}`);
//         if (issuesRes.ok) userIssues = await issuesRes.json();
//       }
//     } catch (err) {
//       console.error('Could not fetch user issues:', err.message);
//     }

//     // 🔹 Build dynamic context
//     const contextText = `
// You are a helpful chatbot assistant for the Panchayat Issue Management System (PIMS).
// You assist users in understanding how to use the platform, such as:
// - How to report an issue
// - How to track or view submitted issues
// - How to submit feedback
// - How to log in, log out, or navigate the dashboard
// - Understanding their issue history or status
// - Explaining the role of administrators, users, and authorities
// - Explaining services provided by PIMS

// User information:
// ${userId ? `User ID: ${userId}` : 'No user logged in'}

// ${userIssues.length > 0 ? `User Issues (${userIssues.length}): ${JSON.stringify(userIssues.slice(0, 3), null, 2)}` : 'No issues reported by this user yet.'}

// Always answer naturally, in 2–4 short sentences, as if chatting. 
// If a user asks something unrelated to PIMS (like general knowledge), politely bring the conversation back to PIMS context.
// `;

//     // 🔹 Generate AI response
//     const response = await openai.chat.completions.create({
//       model: MODEL,
//       messages: [
//         { role: 'system', content: contextText },
//         { role: 'user', content: question }
//       ],
//       max_tokens: 300,
//       temperature: 0.7,
//     });

//     const answer = response.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't process that. Please try again.";
//     res.json({ answer });

//   } catch (err) {
//     console.error('Chatbot error:', err);
//     res.status(500).json({ error: err.message || 'Something went wrong' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🤖 Chatbot server running on port ${PORT}`));


// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import fetch from 'node-fetch';
// import OpenAI from 'openai';

// const app = express();
// app.use(express.json());
// app.use(
//   cors({
//     origin: '*', // Later you can restrict this to your Angular domain
//     credentials: true,
//   })
// );

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo-1106';

// /**
//  * 🌐 MAIN DYNAMIC CHATBOT ENDPOINT
//  * POST /ask
//  * - Understands full dashboard context
//  * - Responds dynamically based on user data + PIMS UI
//  */
// app.post('/ask', async (req, res) => {
//   try {
//     const { question, userId, username, role } = req.body;
//     if (!question)
//       return res.status(400).json({ error: 'Question is required' });

//     // 🔹 Step 1: Fetch user issues dynamically from your backend
//     let userIssues = [];
//     try {
//       if (userId) {
//         const issuesRes = await fetch(
//           `https://pims-application.onrender.com/api/user/issues?userId=${userId}`
//         );
//         if (issuesRes.ok) userIssues = await issuesRes.json();
//       }
//     } catch (err) {
//       console.error('Could not fetch user issues:', err.message);
//     }

//     // 🔹 Step 2: Build contextual awareness based on dashboard UI
//     const dashboardContext = `
// You are a smart, friendly, and context-aware assistant for the Panchayat Issue Management System (PIMS) dashboard.  
// The dashboard consists of the following sections:

// 🏠 **Home Section**
// - Displays a hero section with community-related insights.
// - Offers two main buttons: "Report Issue" and "Give Feedback".
// - Shows success metrics like “150+ solved issues” and “98% satisfaction”.

// 📋 **Issues Section**
// - Displays the user's reported issues.
// - If no issues exist, the page shows an empty state encouraging them to report one.
// - For authorities or admins, it shows “You can view and manage all reported issues”.

// ℹ️ **About Section**
// - Explains what PIMS is: a citizen–governance bridge for issue reporting and transparency.
// - Highlights “Transparent Process”, “Quick Resolution”, and “Community Driven” features.

// ⚙️ **Services Section**
// - Lists 6 services: Issue Reporting, Real-Time Tracking, Community Engagement, Team Leadership, Innovation, and Architecture.
// - Each service supports local community management and efficient civic governance.

// 👤 **Profile Dropdown**
// - Displays the logged-in user’s name and ID.
// - Allows login or logout depending on authentication.

// 💬 **Chatbot Role**
// - You appear at the bottom as a chat assistant.
// - You can explain what each section does.
// - Help users find where to click for reporting issues or submitting feedback.
// - Redirect irrelevant questions politely toward the PIMS system.

// 📋 **Dynamic Issues Behavior**
// - Always answer how many issues the user has submitted based on the 'userIssues' array.
// - Include the status of each issue (Pending, Resolved, Rejected) when listing them.
// - If the array is empty, respond with: "You haven't submitted any issues yet. Click the 'Report Issue' button on the Home section to add your first issue."
// - Keep answers short (2–4 sentences), friendly, and specific to the PIMS dashboard.


// User Info:
// ${username ? `Username: ${username}` : 'Guest user'}
// ${userId ? `User ID: ${userId}` : 'Not logged in'}
// ${role ? `Role: ${role}` : 'No specific role'}
// User has ${userIssues.length} issue(s).
// ${
//   userIssues.length > 0
//     ? 'Example issue: ' + JSON.stringify(userIssues[0], null, 2)
//     : 'No issues reported yet.'
// }

// Now, based on this dashboard and user data, answer the following naturally:
// "${question}"

// Guidelines for your tone:
// - Keep answers short (2–4 sentences), friendly, and specific to the dashboard.
// - Do not mention HTML, Angular, or code.
// - Never reveal backend or API URLs.
// - Always respond as if you are part of the PIMS dashboard interface.
// `;

//     // 🔹 Step 3: Generate a context-aware answer
//     const aiResponse = await openai.chat.completions.create({
//       model: MODEL,
//       messages: [
//         { role: 'system', content: dashboardContext },
//         { role: 'user', content: question },
//       ],
//       temperature: 0.7,
//       max_tokens: 400,
//     });

//     const answer =
//       aiResponse.choices?.[0]?.message?.content?.trim() ||
//       "I'm here to assist you with the PIMS dashboard. Could you please rephrase your question?";

//     res.json({ answer });
//   } catch (err) {
//     console.error('Chatbot error:', err);
//     res.status(500).json({ error: err.message || 'Something went wrong' });
//   }
// });




// /**
//  * 🌄 IMAGE GENERATION ENDPOINT
//  * POST /generate-image
//  * Body: { prompt: string, size?: string }
//  */
// /**
//  * 🌄 IMAGE GENERATION ENDPOINT (PIMS Dashboard Styled)
//  * POST /generate-image
//  * Body: { prompt?: string, size?: string }
//  */
// app.post('/generate-image', async (req, res) => {
//   try {
//     const { prompt, size } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ error: 'Prompt is required' });
//     }

//     // Safe default size
//     const imageSize = size || '512x512';

//     // Generate image from OpenAI
//     const imageResponse = await openai.images.generate({
//       model: 'gpt-image-1',
//       prompt: `Illustration of the PIMS dashboard: ${prompt}. Make it friendly, modern, and clear. Include UI elements like charts, buttons, and user reports.`,
//       size: imageSize,
//       n: 1,
//       response_format: 'b64_json' // ensures we get base64 for direct rendering
//     });

//     const base64Data = imageResponse.data[0].b64_json;

//     // Return base64 string so frontend can display immediately
//     res.json({ 
//       imageBase64: `data:image/png;base64,${base64Data}`
//     });
//   } catch (err) {
//     console.error('Image generation error:', err);
//     res.status(500).json({ error: err.message || 'Failed to generate image' });
//   }
// });

// // ✅ Health Check Endpoint
// app.get('/', (req, res) => res.send('✅ Dynamic PIMS Chatbot API is active.'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`🤖 Dynamic PIMS Chatbot running on port ${PORT}`)
// );



  import 'dotenv/config';
  import express from 'express';
  import cors from 'cors';
  import fetch from 'node-fetch';
  import OpenAI from 'openai';

  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: '*', // Later you can restrict this to your Angular domain
      credentials: true,
    })
  );

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo-1106';

  /**
   * 🌐 MAIN DYNAMIC CHATBOT ENDPOINT
   * POST /ask
   * - Understands full dashboard context
   * - Responds dynamically based on user data + PIMS UI
   */
app.post('/ask', async (req, res) => {
  try {
    const { question, userId, username, role, email } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // 🔹 Fetch user issues dynamically
    let userIssues = [];
    try {
      if (userId) {
        console.log(`Fetching issues for userId: ${userId}`);
        const issuesRes = await fetch(
          `https://pims-application.onrender.com/api/user/issues?userId=${userId}`
        );
        if (issuesRes.ok) {
          const data = await issuesRes.json();
          if (Array.isArray(data)) userIssues = data;
          else if (data.data && Array.isArray(data.data)) userIssues = data.data;
        } else {
          console.warn('⚠️ Issue fetch failed:', issuesRes.status);
        }
      }
    } catch (err) {
      console.error('❌ Could not fetch user issues:', err.message);
    }
     // 🔹 Fetch user feedbacks
   // 🔹 Fetch user feedbacks dynamically
let userFeedbacks = [];
try {
  if (userId) {
    console.log(`Fetching feedbacks for userId: ${userId}`);
   const feedbackRes = await fetch(
  `https://pims-application.onrender.com/api/feedback?userId=${userId}`
);

    if (feedbackRes.ok) {
      const data = await feedbackRes.json();
      if (Array.isArray(data)) userFeedbacks = data;
      else if (data.data && Array.isArray(data.data)) userFeedbacks = data.data;
    } else {
      console.warn('⚠️ Feedback fetch failed:', feedbackRes.status);
    }
  }
} catch (err) {
  console.error('❌ Could not fetch user feedbacks:', err.message);
}


    // 🔹 Build issues summary (include date, location, and status)
    let issuesSummary;
    if (!userIssues || userIssues.length === 0) {
      issuesSummary = "You haven't submitted any issues yet. Ask them to use the 'Report Issue' button.";
    } else {
      issuesSummary =
        `User has submitted ${userIssues.length} issue(s):\n` +
        userIssues
          .map(
            (issue, i) =>
              `${i + 1}. "${issue.description}" (Type: ${issue.issueType}, Location: ${issue.location}, Date: ${new Date(
                issue.date
              ).toDateString()}, Status: ${issue.status}).`
          )
          .join('\n');
    }
    // 🔹 Build feedback summary
   // 🔹 Build feedback summary
let feedbackSummary;
if (!userFeedbacks || userFeedbacks.length === 0) {
  feedbackSummary =
    "You haven't submitted any feedback yet. Click the 'Give Feedback' button on the Home section to share your thoughts and suggestions.";
} else {
  feedbackSummary =
    `You have submitted ${userFeedbacks.length} feedback(s):\n` +
    userFeedbacks
      .map(
        (fb, i) =>
          `${i + 1}. "${fb.message || fb.feedbackText || fb.comment || 'No feedback message'}" (Date: ${new Date(
            fb.date || fb.createdAt || Date.now()
          ).toDateString()}).`
      )
      .join('\n');
}


      // 🔹 Step 3: Build contextual awareness based on dashboard UI
      const dashboardContext = `
  You are a smart, friendly, and context-aware assistant for the Panchayat Issue Management System (PIMS) dashboard.  
  The dashboard consists of the following sections:

  🏠 **Home Section**
  - Displays a hero section with community-related insights.
  - Offers two main buttons: "Report Issue" and "Give Feedback".
  - Shows success metrics like “150+ solved issues” and “98% satisfaction”.

  📋 **Issues Section**
  - Displays the user's reported issues.
  - If no issues exist, the page shows an empty state encouraging them to report one.
  - For authorities or admins, it shows “You can view and manage all reported issues”.

  ℹ️ **About Section**
  - Explains what PIMS is: a citizen–governance bridge for issue reporting and transparency.
  - Highlights “Transparent Process”, “Quick Resolution”, and “Community Driven” features.

  ⚙️ **Services Section**
  - Lists 6 services: Issue Reporting, Real-Time Tracking, Community Engagement, Team Leadership, Innovation, and Architecture.
  - Each service supports local community management and efficient civic governance.

  👤 **Profile Dropdown**
  - Displays the logged-in user’s name and ID.
  - Allows login or logout depending on authentication.

  💬 💬 **Chatbot Role**
- You appear at the bottom as a virtual assistant within the PIMS dashboard.  
- Your purpose is to help users understand the different sections of the dashboard.  
- Guide users on where to click to report issues or give feedback.  
- Respond politely and naturally to civic-related questions.  
- Redirect irrelevant or unrelated queries toward the main PIMS system.  
- Always stay in character as part of the PIMS dashboard — never reveal backend URLs, APIs, or code details.  

  📋 **Dynamic Issues Behavior**
  - Always answer how many issues the user has submitted based on the 'userIssues' array.
  - Include the status of each issue (Pending, Resolved, Rejected) when listing them.
  - If the array is empty, respond with: "You haven't submitted any issues yet. Click the 'Report Issue' button on the Home section to add your first issue."
  - Keep answers short (2–4 sentences), friendly, and specific to the PIMS dashboard.

  User Info:
  ${username ? `Username: ${username}` : 'Guest user'}
  ${userId ? `User ID: ${userId}` : 'Not logged in'}
  ${role ? `Role: ${role}` : 'No specific role'}
  Issues Summary:
  ${issuesSummary}
  Feedback Summary:
${feedbackSummary}

  Now, based on this dashboard and user data, answer the following naturally:
  "${question}"

  Guidelines for your tone:
  - Keep answers short (2–4 sentences), friendly, and specific to the dashboard.
  - Do not mention HTML, Angular, or code.
  - Never reveal backend or API URLs.
  - Always respond as if you are part of the PIMS dashboard interface.






---

### Chatbot behavior:
- If the user asks **when** or **what issue**, check issue.date or description.
- If they ask **how many**, count the issues.
- If they ask **status**, respond using issue.status.
- If they ask **where or what type**, respond with issueType and location.
- If user asks about personal info (like email or name), answer using userInfo.
- If there are no issues, remind them to use "Report Issue".
- For random questions, answer briefly (2–4 sentences) but stay friendly and helpful as a civic assistant.
- Never mention backend URLs, API, or code.

Now answer naturally, based on all data above:
"${question}"
  `;

      // 🔹 Step 4: Generate a context-aware answer
      const aiResponse = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: dashboardContext },
          { role: 'user', content: question },
        ],
        temperature: 0.7,
        max_tokens: 400,
      });

      const answer =
        aiResponse.choices?.[0]?.message?.content?.trim() ||
        "I'm here to assist you with the PIMS dashboard. Could you please rephrase your question?";

      res.json({ answer });
    } catch (err) {
      console.error('Chatbot error:', err);
      res.status(500).json({ error: err.message || 'Something went wrong' });
    }
  });

  /**
   * 🌄 IMAGE GENERATION ENDPOINT (PIMS Dashboard Styled)
   * POST /generate-image
   * Body: { prompt?: string, size?: string }
   */
app.post('/generate-image', async (req, res) => {
  try {
    const { prompt, size } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // ✅ Use supported sizes only
    const validSizes = ['1024x1024', '1024x1536', '1536x1024', 'auto'];
    const imageSize = validSizes.includes(size) ? size : '1024x1024';

    const imageResponse = await openai.images.generate({
      model: 'gpt-image-1',
      prompt: `Illustration of the Panchayat Issue Management System (PIMS) dashboard: ${prompt}. Make it friendly, modern, and clear, with UI elements like charts, buttons, and user reports.`,
      size: imageSize,
      n: 1,
    });

    const imageUrl = imageResponse.data[0].url;

    res.json({ imageUrl });
  } catch (err) {
    console.error('🖼️ Image generation error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate image' });
  }
});



  // ✅ Health Check Endpoint
  app.get('/', (req, res) => res.send('✅ Dynamic PIMS Chatbot API is active.'));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🤖 Dynamic PIMS Chatbot running on port ${PORT}`)
  );
