// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/Skeleton", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ Connected to MongoDB (Skeleton)");
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

// API routes
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
