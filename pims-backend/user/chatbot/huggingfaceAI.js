import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*', // Later restrict this to your frontend domain
    credentials: true,
  })
);

// Hugging Face settings
const HF_API_KEY = process.env.HF_API_KEY; // Your Hugging Face API Key
const HF_TEXT_MODEL = process.env.HF_TEXT_MODEL || 'gpt2'; // Text-generation model
const HF_IMAGE_MODEL = process.env.HF_IMAGE_MODEL || 'stabilityai/stable-diffusion-2'; // Image-generation model
const HF_ROUTER_ENDPOINT = 'https://router.huggingface.co/hf-inference'; // New router endpoint


// Helper: Generate text using Hugging Face Inference API
// Helper: Generate text using Hugging Face Router
async function generateText(prompt) {
  const url = `${HF_ROUTER_ENDPOINT}/models/${HF_TEXT_MODEL}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 400, temperature: 0.7 },
      }),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Unexpected response from Hugging Face: ${text}`);
    }

    if (data.error) throw new Error(data.error);

    return Array.isArray(data) && data[0].generated_text
      ? data[0].generated_text
      : "I'm here to assist you with the PIMS dashboard. Could you please rephrase your question?";
  } catch (err) {
    console.error('Hugging Face text generation error:', err.message);
    return "I'm here to assist you with the PIMS dashboard. Something went wrong.";
  }
}

// Helper: Generate image using Hugging Face Router
async function generateImage(prompt, size = '1024x1024') {
  const url = `${HF_ROUTER_ENDPOINT}/models/${HF_IMAGE_MODEL}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Illustration of the Panchayat Issue Management System (PIMS) dashboard: ${prompt}. Make it friendly, modern, clear, with UI elements like charts, buttons, and user reports.`,
        options: { wait_for_model: true },
      }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('image')) {
      const text = await response.text();
      throw new Error(`Unexpected response from Hugging Face image API: ${text}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return `data:image/png;base64,${base64}`;
  } catch (err) {
    console.error('Hugging Face image generation error:', err.message);
    return null;
  }
}



/**
 * 🌐 MAIN CHATBOT ENDPOINT
 */
app.post('/ask', async (req, res) => {
  try {
    const { question, userId, username, role } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });

    // Fetch user issues
    let userIssues = [];
    try {
      if (userId) {
        const issuesRes = await fetch(
          `https://pims-application.onrender.com/api/user/issues?userId=${userId}`
        );
        if (issuesRes.ok) {
          const data = await issuesRes.json();
          if (Array.isArray(data)) userIssues = data;
          else if (data.data && Array.isArray(data.data)) userIssues = data.data;
        }
      }
    } catch (err) {
      console.error('❌ Could not fetch user issues:', err.message);
    }

    // Build issues summary
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

    // Keep your exact original dashboardContext
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

  💬 **Chatbot Role**
  - You appear at the bottom as a chat assistant.
  - You can explain what each section does.
  - Help users find where to click for reporting issues or submitting feedback.
  - Redirect irrelevant questions politely toward the PIMS system.

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

    const answer = await generateText(dashboardContext);
    res.json({ answer });
  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({ error: err.message || 'Something went wrong' });
  }
});

/**
 * 🌄 IMAGE GENERATION ENDPOINT
 */
app.post('/generate-image', async (req, res) => {
  try {
    const { prompt, size } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const imageUrl = await generateImage(prompt, size);
    if (!imageUrl) return res.status(500).json({ error: 'Failed to generate image' });

    res.json({ imageUrl });
  } catch (err) {
    console.error('Image generation error:', err);
    res.status(500).json({ error: err.message || 'Something went wrong' });
  }
});

// ✅ Health Check
app.get('/', (req, res) => res.send('✅ Dynamic PIMS Chatbot API (Hugging Face) is active.'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🤖 PIMS Hugging Face server running on port ${PORT}`));
