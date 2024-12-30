require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const drawRoutes = require("./src/routes/drawRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true,
    tls: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/api/draws", drawRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
