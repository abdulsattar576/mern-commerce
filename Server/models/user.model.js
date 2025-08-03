const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: [5, "Full Name must be at least 5 character long "],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Email must be at least 5 character long "],
  },
  password: {
    type: String,
    required: true,
    minLength: [5, "Password must be at least 5 character long "],
  },
 cart: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  }
],
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
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
userSchema.methods.comparedPassword = function (password) {
  return bcrypt.compare(password, this.password);
};
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
