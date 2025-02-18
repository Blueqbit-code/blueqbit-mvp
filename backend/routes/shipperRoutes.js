const express = require("express");
const router = express.Router();
const Shipper = require("../models/Shipper");
const Shipment = require("../models/Shipment"); // Ensure Shipment model exists

// Get all shippers
router.get("/", async (req, res) => {
  try {
    const shippers = await Shipper.find().populate("shipmentsPosted"); // Populate shipments
    res.json(shippers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new shipper
router.post("/", async (req, res) => {
  try {
    const newShipper = new Shipper(req.body);
    await newShipper.save();
    res.status(201).json(newShipper);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ New Route: Post a shipment for a shipper
router.post("/:shipperId/shipments", async (req, res) => {
  try {
    const { shipperId } = req.params;
    const { title, description, origin, destination } = req.body; // Ensure these fields are in the frontend

    // Check if shipper exists
    const shipper = await Shipper.findById(shipperId);
    if (!shipper) {
      return res.status(404).json({ error: "Shipper not found" });
    }

    // Create new shipment
    const newShipment = new Shipment({ title, description, origin, destination, shipper: shipperId });
    await newShipment.save();

    // Update shipper's shipment list
    shipper.shipmentsPosted.push(newShipment._id);
    await shipper.save();

    res.status(201).json(newShipment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a shipper
router.put("/:id", async (req, res) => {
  try {
    const updatedShipper = await Shipper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedShipper);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a shipper
router.delete("/:id", async (req, res) => {
  try {
    await Shipper.findByIdAndDelete(req.params.id);
    res.json({ message: "Shipper deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
