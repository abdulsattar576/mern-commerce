import { createSlice } from "@reduxjs/toolkit";
import { CartThunk, getUserCart, logoutThunk, userLoginThunk, userProfileThunk, userRegisterThunk } from "./user.thunk";
import toast from "react-hot-toast";
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  cart: [],
  checkauth:false,
  cartLen:null
};
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // Handle user registration
    builder.addCase(userRegisterThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.checkauth=true
    });
    builder.addCase(userRegisterThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      console.log("User registered successfully:", action.payload);
      state.isAuthenticated = true;
      state.checkauth=false
    });
    builder.addCase(userRegisterThunk.rejected, (state, action) => {
      state.loading = false;
      state.checkauth=true
      state.error = action.payload;

      // Show the actual validation error toast here
      if (action.payload?.errors && Array.isArray(action.payload.errors)) {
        toast.error(action.payload.errors[0].msg); // show the first validation error
      } else {
        toast.error(action.payload?.message || "Registration failed");
      }
    });

    // Handle user login
    builder.addCase(userLoginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.checkauth=true
    });
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      console.log("User logged in successfully:", action.payload);
      state.isAuthenticated = true;
      state.checkauth=false
    });
    builder.addCase(userLoginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.checkauth=false
        // Show the actual validation error toast here
        if (action.payload?.errors && Array.isArray(action.payload.errors)) {
          toast.error(action.payload.errors[0].msg); // show the first validation error
        } else {
          toast.error(action.payload?.message || "Login failed");
        }
    });
    //user profile
    builder.addCase(userProfileThunk.pending, (state) => {
      state.checkauth = true;
      state.error = null;
    });
    builder.addCase(userProfileThunk.fulfilled, (state, action) => {
      state.checkauth = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(userProfileThunk.rejected, (state, action) => {
      state.checkauth = true;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
      
    });
    //userCart
    builder.addCase(CartThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(CartThunk.fulfilled, (state, action) => {
      state.loading = false;
      toast.success("Product added to cart successfully");
    });
    builder.addCase(CartThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // Show the actual error toast here
      toast.error(action.payload?.message || "Failed to add product to cart");
    });
    //getCart
      builder.addCase(getUserCart.pending,(state,action)=>{
state.error=false
state.loading=true
      })
      builder.addCase(getUserCart.fulfilled,(state,action)=>{
        state.loading=true
        state.cart=action.payload?.cart
        state.cartLen=action.payload?.cart.length
console.log( action.payload?.cart.length)
      })
      builder.addCase(getUserCart.rejected,(state,action)=>{
        state.error=action.payload
        state.loading=true
      })
      //logout
      builder.addCase(logoutThunk.pending,(state,action)=>{
state.loading=true
state.error=false
      })
      builder.addCase(logoutThunk.fulfilled,(state,action)=>{
        state.loading=false
        state.cart=[]
        state.user=null
      })
      builder.addCase(logoutThunk.rejected,(state,action)=>{
        state.error=action.payload
        state.loading=true
      })
    //add more thunks as needed
  },
});
export default userSlice.reducer;
export const {} = userSlice.actions;
