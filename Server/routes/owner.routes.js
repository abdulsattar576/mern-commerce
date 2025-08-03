const express=require('express')
const router=express.Router()
const{body}=require('express-validator');
const { registerAdmin, loginAdmin, adminProfile, getAllUsers } = require('../controllers/owner.controller');
const { authAdmin } = require('../middlewares/user.authMiddleware');
router.post('/create-admin',[
     body('fullName').isLength({min:5}).withMessage("fullName Must be at least 5 character long"),
        body('email').isEmail().withMessage("Invalid Email"),
        body('password').isLength({min:5}).withMessage('password must be at least five character long')
],registerAdmin);
//login
router.post('/login-admin',[
         body('email').isEmail().withMessage("Invalid Email"),
        body('password').isLength({min:5}).withMessage('password must be at least five character long')
],loginAdmin)
//profile
router.get('/get-admin',authAdmin,adminProfile)
router.get("/get-allUsers",authAdmin,getAllUsers)
module.exports=router
