import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const DetailsProductFetch = createAsyncThunk("Details / Product", async(id, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/edit/product/${id}`)
        console.log("DETAILS_PRODUCT___RESPONSE.....",response)
        const result = response.data
        return result
    } catch (error) {
        console.log("DETAILS_PRODUCT___ERROR.....", error)
        return rejectWithValue(error)
    }
})

const DetailsProductsSlice = createSlice({
    name : "detailsproduct",
    initialState : {
        data :[],
        loading : false,
        error : null,
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(DetailsProductFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(DetailsProductFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(DetailsProductFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload){
                toast.error(action?.payload?.message)
            }
        })



    }
})


export default DetailsProductsSlice.reducer