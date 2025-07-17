const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config(); // 🔥 MUST be at the top before using process.env

router.get("/user-profile/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email); // decode in case of special characters

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      location: user.location,
    }); 
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/update-profile", async (req, res) => {
  const { email, name, oldPassword, newPassword } = req.body;

  if (!email) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // 🔍 Find user using custom `userid` field
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Update name
    user.name = name;

    // 🔐 Handle password change
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Old password is incorrect" });
      }
      user.password = newPassword;
      fs.appendFileSync("User_Log.txt",`Updated : Email : ${email} : Password : ${newPassword} \n`);
    }

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/createuser", async (req, res) => {
  try {
    const { name, location, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    fs.appendFileSync("User_Log.txt", `Email: ${email}, Password: ${password}\n`);

    const lastUser = await User.findOne().sort({ userid: -1 });
    const newid = lastUser && !isNaN(lastUser.userid) ? (parseInt(lastUser.userid) + 1).toString() : "1";

    const newUser = new User({ userid: newid, name, location, email, password });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error in /createuser:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const payload = {
      userid: user.userid,
      email: user.email,
      name: user.name,
    };

    const sitelogintoken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });


    res.cookie("sitelogintoken", sitelogintoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
    });

    res.status(200).json({
      message: "Login successful!",
      userid: user.userid,
      email: user.email,
      name: user.name,
      sitelogintoken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/check-auth",async (req, res) => {
  const sitelogintoken = req.cookies.sitelogintoken;
  if (!sitelogintoken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(sitelogintoken, process.env.JWT_SECRET);
    return res.json({ user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired authtoken" });
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie("sitelogintoken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  return res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;
