import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const AllProductFetch = createAsyncThunk("All / Product", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/product`)
        console.log("ALL_PRODUCT___RESPONSE.....",response)
        const result = response.data
        return result
    } catch (error) {
        console.log("ALL_PRODUCT___ERROR.....", error)
        return rejectWithValue(error)
    }
})

const AllProductsSlice = createSlice({
    name : "allproduct",
    initialState : {
        data :[],
        loading : false,
        error : null,
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(AllProductFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(AllProductFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                // toast.success(action?.payload?.message)
            }
        })
        builder.addCase(AllProductFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload){
                toast.error(action?.payload?.message)
            }
        })



    }
})


export default AllProductsSlice.reducer