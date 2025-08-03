 import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
 import { userRegisterThunk } from "../redux/user/user.thunk";
 import toast,{Toaster} from "react-hot-toast";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token=localStorage.getItem("user_token")
   useEffect(() => {
  if (token) {
    navigate("/shop");
  }
}, [token, navigate]);

  const [SignUpData, SetSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSignUpData = (e) => {
    SetSignUpData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    if (
      !SignUpData.fullName ||
      !SignUpData.email ||
      !SignUpData.password
    ) {
      toast.error("Please fill all fields");
      return;
    }
    const response = await dispatch(userRegisterThunk(SignUpData));
       

if (response?.payload?.success) {
  localStorage.setItem("user_token", response?.payload?.user_token);
  navigate("/shop");
} else {
  toast.error(response?.payload?.message || "Registration failed");
}

  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={3}
    >
      <Paper elevation={3} sx={{ maxWidth: 500, width: "100%", p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Please Signup..!!
        </Typography>
        <Toaster />
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Full Name"
            name="fullName"
            value={SignUpData.fullName}
            onChange={handleSignUpData}
            InputProps={{
              startAdornment: <FaUser style={{ marginRight: 8 }} />,
            }}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={SignUpData.email}
            onChange={handleSignUpData}
            InputProps={{
              startAdornment: <FaUser style={{ marginRight: 8 }} />,
            }}
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={SignUpData.password}
            onChange={handleSignUpData}
            InputProps={{
              startAdornment: <RiLockPasswordFill style={{ marginRight: 8 }} />,
            }}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            fullWidth
          >
            Signup
          </Button>
          <Typography variant="body2" align="center">
            Already have an account? &nbsp;
            <Link to="/login" style={{ color: "#1976d2", textDecoration: "underline" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
