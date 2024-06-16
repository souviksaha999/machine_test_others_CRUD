import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const UpdatePasswordPost = createAsyncThunk("UpdatePassword / User", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/update-password`, data)
        console.log("UPDATE__PASSWORD___RESPONSE.....",response)
        const result = response.data
        return result
    } catch (error) {
        console.log("UPDATE__PASSWORDT___ERROR.....", error)
        return rejectWithValue(error)
    }
})

export const ForgetPasswordPost = createAsyncThunk("ForgetPassword / User", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/forget-password`, data)
        console.log("FORGET__PASSWORD___RESPONSE.....",response)
        const result = response.data
        return result
    } catch (error) {
        console.log("FORGET__PASSWORDT___ERROR.....", error)
        return rejectWithValue(error)
    }
})

const UpdateForgetPasswordSlice = createSlice({
    name : "updateForgetpassword",
    initialState : {
        data :[],
        loading : false,
        error : null,
        // redirectToAllproducts : null
    },
    reducers : {
        // reset_redirectToAllproducts : (state,action)=>{
        //     state.redirectToAllproducts = null
        // }
    },

    extraReducers : (builder)=>{
        builder.addCase(UpdatePasswordPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(UpdatePasswordPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.success === true){
                toast.success(action?.payload?.msg)
                // state.redirectToAllproducts = "/allproducts"
            }
        })
        builder.addCase(UpdatePasswordPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload){
                toast.error(action?.payload?.message)
            }
        })


        builder.addCase(ForgetPasswordPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(ForgetPasswordPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.success === true){
                toast.success(action?.payload?.message)
                // state.redirectToAllproducts = "/allproducts"
            }
        })
        builder.addCase(ForgetPasswordPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload){
                toast.error(action?.payload?.message)
            }
        })



    }
})

// export const {reset_redirectToAllproducts} = AddProductsSlice.actions
export default UpdateForgetPasswordSlice.reducer