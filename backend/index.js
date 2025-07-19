const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { ConnectMongoDB } = require("./db.js");
const userRouter = require("./routes/ruser.js");
const dataRouter = require("./routes/displaydata.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const prouter=require("./controllers/userPurchaseItem.js");
const razorpay_router=require("./controllers/Razorpay_Apis.js");
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", userRouter, dataRouter,prouter,razorpay_router);

//"mongodb://127.0.0.1:27017/fooddb"
// ✅ STEP 1: Connect Mongoose
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
  console.log("✅ Mongoose connected");

  // ✅ STEP 2: Connect native MongoDB client for global collections
  return ConnectMongoDB(process.env.MONGO_URI);
})
.then(async (client) => {
  console.log("✅ Native MongoDB client connected");

  const db = client.db("fooddb");
  global.menuitems = await db.collection("menuitems").find({}).toArray();
  global.categories = await db.collection("categories").find({}).toArray();

   console.log("🌍 Loaded categories:", global.categories.length);
  console.log("🌍 Loaded menuitems:", global.menuitems.length);

  // ✅ STEP 3: Start server after both DBs are connected
  app.listen(PORT, () => {
    console.log(`🚀 Server running On Port :${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ DB connection error:", err); 
});
