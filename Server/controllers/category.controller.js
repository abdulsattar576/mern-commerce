 // category.controller.js
const categoryModel = require('../models/category.model');
const { validationResult } = require('express-validator');
module.exports.createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const category = await categoryModel.create({ name: req.body.name });
    res.status(201).json({ category });
  } catch (error) {
    res.status(500).json({ error: 'Category creation failed',message:error.message });
  }
};
//get singe category
 
module.exports.getCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Find category by name and populate the 'product' array
    const category = await categoryModel.findOne({ name: req.params.name }).populate('product');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    // Return the category with populated products
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}