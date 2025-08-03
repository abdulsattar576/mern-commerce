import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../components/utill/AxiosInstance";


export const adminLoginThunk=createAsyncThunk('admin/login', async (loginData, { rejectWithValue }) => {
  try {
    const { email, password } = loginData;
    const response = await axiosInstance.post("/owner/login-admin", {
        email,
        password,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data || { message: error.message }
    );
  }
});
//

//admin profile
export const adminProfileThunk=createAsyncThunk("admin/profile",async(_, { rejectWithValue })=>{
  try {
    const token = localStorage.getItem("token");
 
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
    const response = await axiosInstance.get("/owner/get-admin", config);
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data || { message: error.message }
    );
  }
})
//getallUsers
export const getAllUsersThunk=createAsyncThunk("/admin/get-allUsers",async(_,{rejectWithValue})=>{
  try {
    const token = localStorage.getItem("token");
 
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
    const response=await axiosInstance.get("/owner/get-allUsers",config)
    return response.data
    
  } catch (error) {
    return response?.error?.data || {message:error.message}
  }
})