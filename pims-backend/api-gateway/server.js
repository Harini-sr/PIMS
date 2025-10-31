// gateway.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Targets
const adminTarget = "http://localhost:3000";
const userTarget = "http://localhost:8000";

// // Health check
// app.get("/", (req, res) => res.send("API Gateway running"));
// app.get("/health", (req, res) => res.json({ status: "ok" }));

// ADMIN routes: /api/admin/* -> admin server /api/*
app.use(
  "/api/admin",
  createProxyMiddleware({
    target: adminTarget,
    changeOrigin: true,
    pathRewrite: { "^/api/admin": "/api" }, // maps /api/admin/issues -> /api/issues
  })
);

// USER routes: /api/user/* and /api/feedback/* -> user server
app.use(
  "/api/user",
  createProxyMiddleware({
    target: userTarget,
    changeOrigin: true,
    pathRewrite: { "^/api/user": "/api/user" }, // keep same
  })
);

app.use(
  "/api/feedback",
  createProxyMiddleware({
    target: userTarget,
    changeOrigin: true,
    pathRewrite: { "^/api/feedback": "/api/feedback" }, // keep same
  })
);

// app.use("/api/feedback", (req, res, next) => {
//   console.log("Gateway received request:", req.method, req.originalUrl);
//   next();
// });
// Fallback
app.use((req, res) => res.status(404).json({ message: "Not found on gateway" }));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚦 API Gateway running on http://localhost:${PORT}`);
  console.log(` -> admin target: ${adminTarget}`);
  console.log(` -> user target: ${userTarget}`);
});
