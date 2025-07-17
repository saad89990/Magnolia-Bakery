const mongoose=require("mongoose");

const User_Query=new mongoose.Schema({
    userid:{type:String},
    name:{type:String},
    email:{type:String},
    Message:{type:String},
    Time:{type:Date,default:Date.now},
});

module.exports=mongoose.model("User_Query",User_Query);