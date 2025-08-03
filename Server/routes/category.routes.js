const express=require('express');
const router=express.Router();
 const { body ,param} = require('express-validator');
const { createCategory, getCategory } = require('../controllers/category.controller');
const { authAdmin } = require('../middlewares/user.authMiddleware');
router.post('/create-category',[
    body('name').notEmpty().withMessage('Name is required')
],createCategory)
router.get('/get-category/:name',authAdmin,[
    param('name').notEmpty().withMessage('Name is required')
],getCategory)
module.exports=router