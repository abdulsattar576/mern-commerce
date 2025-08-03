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
 
import { adminLoginThunk } from "../redux/admin/admin.thunk";

const AdminLogin = () => {
  const [LoginData, setLoginData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

 useEffect(()=>{
   const token=localStorage.getItem("token")
  if(token){
    return navigate("/admin")
  }
 },[navigate])
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
    const response = await dispatch(adminLoginThunk(LoginData));
  
     if (response?.payload?.success) {
      console.log("success"+response?.payload?.success)
  localStorage.setItem("token", response?.payload?.token);
  navigate("/admin/product");
} else {
  toast.error(response?.payload?.message || "Login failed");
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

export default AdminLogin;
