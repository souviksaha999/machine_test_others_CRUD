import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const DeleteProductPost = createAsyncThunk("Delete / Product", async(id, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.delete(`/delete/product/${id}`)
        console.log("DELETE_PRODUCT___RESPONSE.....",response)
        const result = response.data
        return result
    } catch (error) {
        console.log("DELETE_PRODUCT___ERROR.....", error)
        return rejectWithValue(error)
    }
})

const DeleteProductsSlice = createSlice({
    name : "deleteproduct",
    initialState : {
        data :[],
        loading : false,
        error : null,
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(DeleteProductPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(DeleteProductPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(DeleteProductPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload){
                toast.error(action?.payload?.message)
            }
        })
    }
})

export default DeleteProductsSlice.reducer