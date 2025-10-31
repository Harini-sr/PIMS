// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const userRoutes = require("./routes/userRoutes");

// const feedbackRoutes = require("./routes/feedbackRoutes");
// require("./db");

// const app = express();
// app.use(cors({
//   origin: 'http://localhost:4200',  // For development only
//   // methods: ['GET', 'POST', 'PUT', 'DELETE'],
 
//   // allowedHeaders: ['Content-Type', 'Authorization'],
//    credentials:true
// }));
// app.use(bodyParser.json());

// app.use("/api/user", userRoutes);
// app.use("/api/feedback", feedbackRoutes);


// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 User Backend running at http://localhost:${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
require("./db"); // Connect to MongoDB
const feedbackRoutes = require("./routes/feedbackRoutes");
const app = express();

app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true
}));
app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
