const express = require("express");
const router = express.Router();
const Purchase = require("../models/purchaseItem"); // ✅ Correct import

// router.post("/save-db", async (req, res) => {
//   try {
//     const { userid,items, totalPrice, purchasedAt } = req.body;

//     if (!userid || !items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ error: "Items array is required" });
//     }

//     if (typeof totalPrice !== "number") {
//       return res.status(400).json({ error: "Total price is required and must be a number" });
//     }

//     const purchase = new Purchase({
//       userid,
//       items,
//       totalPrice,
//       purchasedAt: purchasedAt ? new Date(purchasedAt) : undefined,
//     });

//     await purchase.save();

//     res.status(201).json({ success: true, message: "Purchase saved", purchase });
//   } catch (error) {
//     console.error("Error saving purchase:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });





module.exports = router;
