
 const dotenv=require('dotenv')
 dotenv.config();
  const express=require('express')
const UserRoutes =require("./routes/user.routes") ;
const ownerRoutes=require('./routes/owner.routes')
const productRoutes=require('./routes/product.routes')
const categoryRoutes=require('./routes/category.routes')
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app=express();
app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true

  }))
app.use("/user",UserRoutes)
app.use('/owner',ownerRoutes)
app.use('/product',productRoutes)
app.use('/category',categoryRoutes)
 module.exports=app