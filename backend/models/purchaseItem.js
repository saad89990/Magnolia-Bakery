const mongoose = require("mongoose");

const purchaseItemSchema = new mongoose.Schema({
  name: { type: String },
  qty: { type: Number },
  size: { type: String },
  price: { type: Number },
  purchasedAt: { type: Date, default: Date.now },
});

const purchaseSchema = new mongoose.Schema({
  items: { type: [purchaseItemSchema] },
  totalPrice: { type: Number },
  userid: { type: String },
  userName:{type:String},
  userEmail:{ type : String},
  // ✅ Razorpay details
  order_id: { type: String },         // Razorpay Order ID
  payment_id: { type: String },       // Razorpay Payment ID
  signature: { type: String },        // Razorpay Signature
  status: {
    type: String,
    enum: ["created", "failed", "successful", "pending", "cancelled", "captured"], // Add 'captured' to allowed values
    default: "pending"
  },
  // Optional: audit trail
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PurchaseItem", purchaseSchema);
