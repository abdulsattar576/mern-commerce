const express = require("express");
const router = express.Router();
const { addProduct, updateProduct, deleteProduct, getProduct } = require("../controllers/product.controller");
const { authAdmin } = require("../middlewares/user.authMiddleware");
const upload = require("../config/multerConfg");
const { body } = require("express-validator");

router.post(
  "/add-product",
  upload.single("image"),

  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("category").notEmpty().withMessage("Category is required"),
  ],

  addProduct
);
router.put(
  "/update-product/:id",
  upload.single("image"),
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters")
      .notEmpty()
      .withMessage("Name is required"),
    body("price")
      .isNumeric()
      .withMessage("Price must be a number")
      .notEmpty()
      .withMessage("Price is required"),
    body("category")
      .notEmpty()
      .withMessage("Category is required"),
  ],
  updateProduct
);
// delete product 
router.delete("/delete-product/:id",deleteProduct);
 
 
module.exports = router;