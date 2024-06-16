import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const AddProductPost = createAsyncThunk("Add / Product", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/create/product`, data)
        console.log("ADD_PRODUCT___RESPONSE.....",response)
        const result = response.data
        return result
    } catch (error) {
        console.log("ADD_PRODUCT___ERROR.....", error)
        return rejectWithValue(error)
    }
})

const AddProductsSlice = createSlice({
    name : "addproduct",
    initialState : {
        data :[],
        loading : false,
        error : null,
        redirectToAllproducts : null
    },
    reducers : {
        reset_redirectToAllproducts : (state,action)=>{
            state.redirectToAllproducts = null
        }
    },

    extraReducers : (builder)=>{
        builder.addCase(AddProductPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(AddProductPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
                localStorage.setItem("prodName", action?.payload?.data?.name)
                state.redirectToAllproducts = "/allproducts"
            }
        })
        builder.addCase(AddProductPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload){
                toast.error(action?.payload?.message)
            }
        })



    }
})

export const {reset_redirectToAllproducts} = AddProductsSlice.actions
export default AddProductsSlice.reducer