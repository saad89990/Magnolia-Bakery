const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
// const fetch = require("node-fetch"); // ✅ Import fetch
const PurchaseItem = require("../models/purchaseItem");
const router = express.Router();

const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET,
});


// router.post("/verify", async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, purchaseData } = req.body;

//   const secret = process.env.RAZORPAY_SECRET;

//   const generated_signature = crypto
//     .createHmac("sha256", secret)
//     .update(razorpay_order_id + "|" + razorpay_payment_id)
//     .digest("hex");

//   if (generated_signature === razorpay_signature) {
//     // ✅ Signature is valid, save the order
//     try {
//       // Replace this with your own DB logic
//       await Order.create(purchaseData); // MongoDB / SQL etc.
//       return res.status(200).json({ success: true, message: "Order saved." });
//     } catch (err) {
//       return res.status(500).json({ success: false, error: "DB Save failed." });
//     }
//   } else {
//     // ❌ Signature invalid
//     return res.status(400).json({ success: false, error: "Invalid signature." });
//   }
// });

//previous good 
// router.post("/verify", async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, purchaseData } = req.body;

//   const secret = process.env.RAZORPAY_SECRET;

//   const generated_signature = crypto
//     .createHmac("sha256", secret)
//     .update(razorpay_order_id + "|" + razorpay_payment_id)
//     .digest("hex");

//   if (generated_signature === razorpay_signature) {
//     // ✅ Signature is valid

//     // Add payment info to the purchaseData object
//     purchaseData.order_id = razorpay_order_id;
//     purchaseData.payment_id = razorpay_payment_id;
//     purchaseData.signature = razorpay_signature;
//     purchaseData.status = "paid";

//     try {
//       await PurchaseItem.create(purchaseData);
//       return res.status(200).json({ success: true, message: "Order verified and saved." });
//     } catch (err) {
//       console.error("DB Save Error:", err);
//       return res.status(500).json({ success: false, error: "Failed to save order." });
//     }
//   } else {
//     // ❌ Signature is invalid
//     return res.status(400).json({ success: false, error: "Invalid signature." });
//   }
// });



//new verify 

router.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  console.log("🧾 Verifying Payment:", {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  console.log("🔐 Generated Signature:", generated_signature);
  console.log("📬 Received Signature:", razorpay_signature);

  if (generated_signature === razorpay_signature) {
    console.log("✅ Payment Verified Successfully!");
    res.status(200).json({ success: true, message: "Payment verified!" });
  } else {
    console.warn("⚠ Payment Verification Failed!");
    res.status(400).json({ success: false, message: "Payment verification failed!" });
  }
});

router.post("/create-order",async (req,res)=>{
    const {amount}=req.body;
    const options={
        amount:amount*100,
        currency:"INR",
    };
    try{
        const order=await razorpay.orders.create(options);
        res.json(order);
    }
    catch(error){
        console.log("Error In Creating Razorpay Order.");
        return res.status(500).json({error:"Failed TO Create Order."});
    }
});


router.post("/save-payment", async (req, res) => {
  try {
    const {userName, userid,userEmail, totalPrice, order_id, payment_id, status,purchaseData} = req.body;
    console.log("📩 Incoming save-payment request:");
    console.log("Name:",userName);
    console.log("User ID:",userid)
    console.log("➡ userEmail:", userEmail);
    console.log("➡ TotalPrice:", totalPrice);
    console.log("➡ orderId:", order_id);
    console.log("➡ paymentId:", payment_id);
    console.log("➡ status:", status);
    console.log("➡ purchase data:", purchaseData);


    const existingPayment = await PurchaseItem.findOne({ order_id });

    if (existingPayment) {
      // Update existing payment status
      existingPayment.payment_id = payment_id || existingPayment.payment_id;
      existingPayment.status = status;
      existingPayment.items=purchaseData;
      // existingPayment.date = new Date();

      await existingPayment.save();
      return res.status(200).json({ success: true, message: "Payment updated successfully" });
    }

    // Create a new payment
    const newPayment = new PurchaseItem({
      userName,
      userid,
      userEmail,
      totalPrice,
      order_id,
      payment_id,
      status,
      items:purchaseData,
    });

    await newPayment.save();
    return res.status(201).json({ success: true, message: "Payment saved successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Error In Saving Payment." });
  }
});

router.get("/my-orders/:userid", async (req, res) => {
  try {
    const orders = await PurchaseItem.find({ userid: req.params.userid }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("❌ Error fetching orders:", err.message);
    res.status(500).json({ success: false, message: "Failed to retrieve orders." });
  }
});

module.exports=router;



// router.post("/save-db", async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, purchaseData } = req.body;

//   try {
//     await PurchaseItem.create(purchaseData);
//     return res.status(200).json({ success: true, message: "Saved to DB." });
//   } catch (err) {
//     console.error("❌ Error saving to DB:", err);
//     return res.status(500).json({ success: false, error: "Failed to save order." });
//   }
// });