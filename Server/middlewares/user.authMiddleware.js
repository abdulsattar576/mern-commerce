const ownerModel = require("../models/owner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
module.exports.authUser=async(req,res,next)=>{
 try {
      const user_token = req.cookies.user_token || req.headers.authorization?.split(" ")[1];
   if (!user_token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
if (!process.env.JWT_SECRET) {
  return res.status(500).json({ message: "JWT secret not configured" });
}
const decode = jwt.verify(user_token, process.env.JWT_SECRET);
 
const user = await userModel.findById(decode.userId);
if (!user) {
  return res.status(401).json({ message: "User not found" });
}
req.user = user;
 
next();

} catch (error) {
  console.error(error);
  return res.status(401).json({ message: "Invalid user_token" });
}
}
//admin middleware
module.exports.authAdmin=async(req,res,next)=>{
  try {
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
  if(!token){
    return res.status(401).json({message:"Unauthorized"})
  }
  if (!process.env.JWT_SECRET) {
  return res.status(500).json({ message: "JWT secret not configured" });
}
  const decode=jwt.verify(token,process.env.JWT_SECRET);
 
const admin=await ownerModel.findById(decode.userId)
if(!admin){
  return res.status(401).json({message:"user not found"})
}
req.admin=admin
next();
  } catch (error) {
    res.status(500).json( {error:error.message})
  }

}