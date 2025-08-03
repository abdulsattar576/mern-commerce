import { createSlice } from "@reduxjs/toolkit";
import { adminLoginThunk, adminProfileThunk, getAllUsersThunk } from "./admin.thunk";
import toast from "react-hot-toast";
 

const initialState = {
    admin: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    checkauth:false,
    users:[]

};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(adminLoginThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(adminLoginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.admin = action.payload;
         
            state.isAuthenticated = true;
        });
        builder.addCase(adminLoginThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;

            // Show the actual validation error toast here
            if (action.payload?.errors && Array.isArray(action.payload.errors)) {
                toast.error(action.payload.errors[0].msg); // show the first validation error
            } else {
                toast.error(action.payload?.message  );
            }
        });
        // admin profile
        builder.addCase(adminProfileThunk.pending, (state) => {
            state.error = null;
            state.loading = true;
            state.checkauth=true
        });
        builder.addCase(adminProfileThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.checkauth=false
            state.admin = action.payload;
           
            state.isAuthenticated = true;
        });
        builder.addCase(adminProfileThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.checkauth=false
            toast.error(action.payload?.message || "Failed to fetch admin profile");
        });
        //getAllUsers
        builder.addCase(getAllUsersThunk.pending,(state,action)=>{
            state.loading=true
            state.error=false
        })
        builder.addCase(getAllUsersThunk.fulfilled,(state,action)=>{
            state.loading=false
            state.users=action.payload.users;
            console.log(action.payload)
        })
        builder.addCase(getAllUsersThunk.rejected,(state,action)=>{
            state.users=null
            state.loading=true
            state.error=action.payload
            console.log(action.payload)
        })
        // add more base on the need
    },
});

export default adminSlice.reducer;
export const { } = adminSlice.actions;
