require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const drawRoutes = require("./routes/drawRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/draws", drawRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
