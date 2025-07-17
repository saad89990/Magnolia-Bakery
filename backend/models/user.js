const mongoose = require("mongoose");
const bcrypt=require("bcrypt");

const userSchema = new mongoose.Schema({
  userid:{type:String,unique:true},
  name: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});
userSchema.pre("save",async function (next) {
  if(!this.isModified("password")) return next();
  try{
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
  }
  catch(error){
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
