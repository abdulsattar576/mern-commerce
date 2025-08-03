const ownerModel = require("../models/owner.model");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");

module.exports.registerAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullName } = req.body;
    const existingOwners = await ownerModel.find();

    if (existingOwners.length > 0) {
      return res
        .status(401)
        .json({ message: "You don't have permission to create an admin" });
    }

    const hashPassword = await ownerModel.hashPassword(password);

    const createOwner = await ownerModel.create({
      email,
      password: hashPassword,
      fullName,
    });

    const token = await createOwner.generateToken();

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7*24 * 60 * 60 * 1000, // 7 day
    });

    return res.status(201).json({ token, admin: createOwner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//loginAdmin
module.exports.loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const existingOwners = await ownerModel.findOne({ email });
    if (!existingOwners) {
      return res
        .status(401)
        .json({ message: "email or password does not match" });
    }
    const matchPassword = await existingOwners.comparedPassword(password);
    if (!matchPassword) {
      return res
        .status(401)
        .json({ message: "email or password does not match" });
    }
    const token = await existingOwners.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7*24 * 60 * 60 * 1000,
    });
    res.status(201).json({ token, admin: existingOwners,success:true });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
//admin profile
module.exports.adminProfile = async (req, res) => {
  const adminId = req.admin;
  const admin = await ownerModel.findById(adminId).select("-password");
  if (!admin) {
    return res.status(401).json({ message: "admin not found" });
  }
  res.status(201).json({ admin ,success:true});
};
//getallusers
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, "_id fullName email createdAt");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

