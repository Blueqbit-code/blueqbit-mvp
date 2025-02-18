// models/Shipment.js
const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  shipper: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Shipper", 
    required: true 
  },
  cargoType: { type: String, required: true },
  weight: { type: Number, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["open", "in-transit", "delivered"], 
    default: "open" 
  }
}, { timestamps: true });

module.exports = mongoose.model("Shipment", shipmentSchema);