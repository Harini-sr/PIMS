
// require("dotenv").config();
// const { seedKnowledge } = require("./models/knowledge");
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const userRoutes = require("./routes/userRoutes");
// require("./db"); // Connect to MongoDB
// const feedbackRoutes = require("./routes/feedbackRoutes");
// const app = express();
// const qaRoutes = require("./routes/qaRoutes");
// app.use(cors({
//   origin: 'http://localhost:4200', 
//   credentials: true
// }));
// app.use(bodyParser.json());

// app.use("/api/user", userRoutes);
// app.use("/api/feedback", feedbackRoutes);

// app.use("/api", qaRoutes);

// seedKnowledge().catch(err => console.error("Failed to seed knowledge:", err));
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");

// Import routes
const userRoutes = require("./routes/userRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

// Connect to MongoDB
require("./db");
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes

// // Import knowledge seeding function
// const { seedKnowledge } = require("./models/knowledge");

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/feedback", feedbackRoutes);
// app.use("/api", qaRoutes);

// Seed knowledge (run once on server start)
// seedKnowledge()
//   .then(() => console.log("✅ Knowledge base seeded"))
//   .catch(err => console.error("❌ Failed to seed knowledge:", err));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
