const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const OwnerSchema = mongoose.Schema({
  fullName: {
    type: String,
    min: [5, "fullName must be at least 5 character long"],
    trim: true,
  },
  email: {
    type: String,

    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

 
  picture: String,
createdAt: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
      },
    {
        timestamps: true,
    }
);
 OwnerSchema.methods.generateToken = function () {
   const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
     expiresIn: "24h",
   });
   return token;
 };
 OwnerSchema.statics.hashPassword = async function (password) {
   return await bcrypt.hash(password, 10);
 };
 OwnerSchema.methods.comparedPassword = function (password) {
   return bcrypt.compare(password, this.password);
 };
const ownerModel= mongoose.model("owner", OwnerSchema);
module.exports=ownerModel
