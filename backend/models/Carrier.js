const mongoose = require("mongoose");
const User = require("./User");

const carrierSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  trucks: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Carrier", carrierSchema);
