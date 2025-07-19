const express=require("express");
const { route } = require("./ruser");
const User_Query=require("../models/User_Query");
const router =express.Router()

router.post("/fooddata",async(req,res)=>{
     try{
        res.send([global.menuitems,global.categories]);
        
     }
     catch(error){
        console.log("Error In fetching data",error);
        return res.status(500).json({message:"Internal Server Error"});
     }
});

//User_Query API's
router.post("/user_query",async(req,res)=>{
   const {email,name,Message,userid}=req.body;

   if(!email || !Message){
      return res.status(400).json({error:"Email And Message Are Required"});
   }

   try{
      const newquery=new User_Query({email,name,userid,Message});
      await newquery.save();
      
      return res.status(200).json({message:"Query Submitted Sucessfully."});
   }
   catch(error){
      console.error("Error Saving user Query",error);
      return res.status(500).json({error:"Internal Server Error"});
   }
});


module.exports=router;