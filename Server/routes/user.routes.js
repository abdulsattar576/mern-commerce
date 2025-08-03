const express =require('express');
const router=express.Router();
const { registerUser, loginUser, getUser, logoutUser, addToCart, getUserCart } = require('../controllers/user.controller');
const { body } = require('express-validator');
const { authUser } = require('../middlewares/user.authMiddleware');

//register
router.post("/register",[
    body('fullName').isLength({min:5}).withMessage("fullName Must be at least 5 character long"),
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:5}).withMessage('password must be at least five character long')
],registerUser)
//login
router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:5}).withMessage('password must be at least five character long')
],loginUser);
router.get("/profile",authUser,getUser);
//logout User
router.post("/logout",authUser,logoutUser)
 module.exports=router
 //add product in user cart
 router.post("/cart",authUser,[
    body("id").notEmpty().withMessage("id is not given")
],addToCart)
//getUserCart
router.get("/get-cart",authUser,getUserCart)