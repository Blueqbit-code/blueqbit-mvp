const mongoose = require("mongoose");
const User = require("./User");

// models/Shipper.js (optional)
const Shipment = require("./Shipment");

const shipperSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String,required: true },
  shipmentsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipment",
  }],
}, { timestamps: true });

module.exports = mongoose.model("Shipper", shipperSchema);