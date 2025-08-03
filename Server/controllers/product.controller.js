const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");
const { validationResult } = require("express-validator");
module.exports.addProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, price, discount, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const foundCategory = await categoryModel.findOne({ name: category });

    if (!foundCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    const product = await productModel.create({
      name,
      price,
      discount,
      description,
      image: req.file.buffer,
      category: [foundCategory._id],
    });

    await categoryModel.updateOne(
      { _id: foundCategory._id },
      { $addToSet: { product: product._id } }
    );

    res.status(201).json({  success:true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};
module.exports.updateProduct = async (req, res) => {
  try {
    const success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, price, discount, description, category } = req.body;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle file/image update
    if (req.file) {
      product.image = req.file.buffer;
    }

    // Update product fields conditionally
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (discount !== undefined) product.discount = discount;
    if (description !== undefined) product.description = description;

    // Handle category update if provided
    if (category !== undefined) {
      const foundCategory = await categoryModel.findOne({ name: category });
      if (!foundCategory) {
        return res.status(400).json({ message: "Category not found" });
      }
      product.category = [foundCategory._id];
    }

    // Save updated product
    await product.save();

    return res
      .status(200)
      .json({ message: "Product updated successfully",success: true });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};
//delete one product
module.exports.deleteProduct = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const success=false
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully",success:true });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

