const express = require("express");
const router = express.Router();
const Carrier = require("../models/Carrier"); // Import Carrier model

// Get all carriers
router.get("/", async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.json(carriers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new carrier
router.post("/", async (req, res) => {
  try {
    const newCarrier = new Carrier(req.body);
    await newCarrier.save();
    res.status(201).json(newCarrier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a carrier
router.put("/:id", async (req, res) => {
  try {
    const updatedCarrier = await Carrier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCarrier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a carrier
router.delete("/:id", async (req, res) => {
  try {
    await Carrier.findByIdAndDelete(req.params.id);
    res.json({ message: "Carrier deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test API
router.get("/", (req, res) => {
  res.send("Carrier API is working!");
});

module.exports = router;
