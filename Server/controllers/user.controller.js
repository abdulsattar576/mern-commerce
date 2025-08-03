const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { default: mongoose } = require("mongoose");

//register user
module.exports.registerUser = async (req, res) => {
  const { fullName, password, email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await userModel.hashPassword(password);
    const user = await userModel.create({
      email,
      password: hashPassword,
      fullName,
    });
    const user_token = await user.generateToken();
    res.cookie("user_token", user_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    });
    res.status(201).json({ user_token, user,success:true });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
//login user
module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: "Email or password does not match" });
    }
    const isMatch = await existingUser.comparedPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email or password does not match" });
    }
    const user_token = await existingUser.generateToken();
    res.cookie("user_token", user_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    });
    res.status(200).json({ user_token, user: existingUser ,success:true});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//userProfile
module.exports.getUser = async (req, res) => {
  const userId = req.user;
  const user = await userModel.findById(userId._id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.status(201).json({ user });
};
//logoutUser
module.exports.logoutUser = async (req, res) => {
  const user_token =
    req.cookies.user_token || req.headers.authorization?.split(" ")[1];
  if (!user_token) {
    return res.status(404).json({ message: "no user_token provided" });
  }
  res.clearCookie("user_token");
  res.status(201).json({ message: "user successfully logout" ,success:true});
};
//addtocart
 

module.exports.addToCart = async (req, res) => {
  const userId = req.user?._id;
  const { id: productId } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    // Use atomic update to prevent duplicates
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId, "cart.product": { $ne: productId } }, // Only update if product not in cart
      { $addToSet: { cart: { product: productId } } },     // Add to set prevents duplicates
      { new: true }                                        // Return updated document
    );

    if (!updatedUser) {
      return res.status(400).json({
        message: "Product is already in the cart",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product added to cart successfully",
      success: true,
      cart: updatedUser.cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

//getProductcart
  

 module.exports.getUserCart = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const user = await userModel.findById(userId).populate("cart.product");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error fetching user cart:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

