// backend/models/Bid.js
const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  carrier: { type: mongoose.Schema.Types.ObjectId, ref: "Carrier", required: true },
  shipment: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment", required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Bid", bidSchema);