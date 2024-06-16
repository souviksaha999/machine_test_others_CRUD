import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const UpdateProductPost = createAsyncThunk("Update / Product", async( {id,formData}, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/update/product/${id}`, formData)
        console.log("UPDATE_PRODUCT___RESPONSE.....",response)
        const result = response.data
        return result
    } catch (error) {
        console.log("UPDATE_PRODUCT___ERROR.....", error)
        return rejectWithValue(error)
    }
})

const UpdateProductsSlice = createSlice({
    name : "updateproduct",
    initialState : {
        data :[],
        loading : false,
        error : null,
        redirectToAllproducts : null
    },
    reducers : {
        reset__redirectToAllproducts : (state,action)=>{
            state.redirectToAllproducts = null
        }
    },

    extraReducers : (builder)=>{
        builder.addCase(UpdateProductPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(UpdateProductPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
                // localStorage.setItem("prodName", action?.payload?.data?.name)
                state.redirectToAllproducts = "/allproducts"
            }
        })
        builder.addCase(UpdateProductPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload){
                toast.error(action?.payload?.message)
            }
        })
    }
})

export const {reset__redirectToAllproducts} = UpdateProductsSlice.actions
export default UpdateProductsSlice.reducer