const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import Routes
const shipperRoutes = require("./routes/shipperRoutes");
const carrierRoutes = require("./routes/carrierRoutes");
const authRoutes = require("./routes/authRoutes");

// Use Routes
app.use("/api/shippers", shipperRoutes);
app.use("/api/carriers", carrierRoutes);
app.use("/api/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 BlueQbit Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
