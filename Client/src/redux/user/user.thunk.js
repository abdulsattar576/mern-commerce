import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../components/utill/AxiosInstance";
import toast from "react-hot-toast";

export const userRegisterThunk = createAsyncThunk(
  "user/register",
  async (SignUpData, { rejectWithValue }) => {
    try {
      const { fullName, email, password } = SignUpData;
      const response = await axiosInstance.post("/user/register", {
        fullName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
// User login thunk
export const userLoginThunk = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const { email, password } = loginData;
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
//profile
 export const userProfileThunk=createAsyncThunk(
  "user/profile",
 async( _,rejectWithValue)=>{
    try {
      const response = await axiosInstance.get("/user/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
 );
 export const CartThunk= createAsyncThunk(
  "user/cart",async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/cart", { id });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  })
  // getuserCart
  export const getUserCart=createAsyncThunk("user/getcart",async(_,{rejectWithValue})=>{
    try {
      const response=await axiosInstance.get("/user/get-cart")
      return response.data
    } catch (error) {
      error.response?.data || {message:error.message}
    }
  })
  // logoutThunk
  export const logoutThunk=createAsyncThunk("user/logout",async(_,{rejectWithValue})=>{
    try {
      const response=await axiosInstance.post("/user/logout")
      return response.data
    } catch (error) {
      error.response?.data || {message:error.message}
    }
  })