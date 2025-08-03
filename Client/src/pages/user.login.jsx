 import React, { useEffect, useState } from "react";
 import {
   TextField,
   Button,
   Box,
   Typography,
   InputAdornment,
   Container,
   Paper,
 } from "@mui/material";
 import { Link, useLocation, useNavigate } from "react-router-dom";
 import { FaUser } from "react-icons/fa";
 import { RiLockPasswordFill } from "react-icons/ri";
 import toast, { Toaster } from "react-hot-toast";
 import { useDispatch, useSelector } from "react-redux";
 import { userLoginThunk } from "../redux/user/user.thunk";
 import { adminLoginThunk } from "../redux/admin/admin.thunk";
 
 const Login = () => {
   const [LoginData, setLoginData] = useState({ email: "", password: "" });
   const dispatch = useDispatch();
   const navigate = useNavigate();
 const token=localStorage.getItem("user_token")
  useEffect(() => {
  if (token) {
    navigate("/shop");
  }
}, [token, navigate]); 
     
   const handleLoginData = (e) => {
     setLoginData((prev) => ({
       ...prev,
       [e.target.name]: e.target.value,
     }));
   };
 
   const handleLogin = async () => {
     if (!LoginData.email || !LoginData.password) {
       toast.error("Please fill all fields");
       return;
     }
     const response = await dispatch(userLoginThunk(LoginData));
     
     if(response.payload?.success){
      localStorage.setItem("user_token", response?.payload?.user_token);
      navigate("/shop")

     }
     else {
  toast.error("Invalid email or password");
}
     
   };
 
   return (
     <Container
       maxWidth="sm"
       sx={{
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         minHeight: "100vh",
       }}
     >
       <Toaster />
       <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
         <Typography variant="h5" gutterBottom>
           Please Login..!!
         </Typography>
 
         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
           <TextField
             label="Email"
             name="email"
             value={LoginData.email}
             onChange={handleLoginData}
             fullWidth
             InputProps={{
               startAdornment: (
                 <InputAdornment position="start">
                   <FaUser />
                 </InputAdornment>
               ),
             }}
           />
 
           <TextField
             label="Password"
             name="password"
             type="password"
             value={LoginData.password}
             onChange={handleLoginData}
             fullWidth
             InputProps={{
               startAdornment: (
                 <InputAdornment position="start">
                   <RiLockPasswordFill />
                 </InputAdornment>
               ),
             }}
           />
 
           <Button variant="contained" color="primary" onClick={handleLogin}>
             Login
           </Button>
         </Box>
       </Paper>
     </Container>
   );
 };
 
 export default Login;
 