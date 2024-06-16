import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const RegisterPost = createAsyncThunk("Register / User", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/register`, data)
        console.log("REGISTER___RESPONSE.....",response)
        const result = response.data
        return result
    } catch (error) {
        console.log("REGISTER___ERROR.....", error)
        return error
    }
})

export const LoginPost = createAsyncThunk("Login / User", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/login`, data)
        console.log("LOGIN___RESPONSE.....",response)
        const result = response.data
        return result
    } catch (error) {
        console.log("LOGIN___ERROR.....", error)
        toast.error(error?.message)
        toast.error(error?.response?.data?.message)
        return error
    }
})

export const DashboardFetch = createAsyncThunk("DashBoard / User", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/user/dashboard`)
        console.log("DASHBOARD___RESPONSE.....",response)
        const result = response.data
        return result
    } catch (error) {
        console.log("DASHBOARD___ERROR.....", error)
        // toast.error(error?.message)
        // toast.error(error?.response?.data?.message)
        return error
    }
})

const AuthSlice = createSlice({
    name : "auth",
    initialState : {
        data :[],
        loading : false,
        error : null,
        logOutToggle : false,
        RedirectToLogin : null,
        RedirectToHome : null,
    },
    reducers : {
        Logout : (state,action)=>{
            localStorage.removeItem("name")
            localStorage.removeItem("token")
            state.logOutToggle = false
        },
        RegLogout : (state,action)=>{
            localStorage.removeItem("name")
        },
        check_token : (state,action)=>{
            let token = localStorage.getItem("token")
            if (token!== null && token!== undefined && token !== ""){
                state.logOutToggle = true
            }
        },
        NavigateToLogin : (state,action)=>{
            state.RedirectToLogin = action.payload
        },
        NavigateToHome : (state,action)=>{
            state.RedirectToHome = action.payload
        }

    },

    extraReducers : (builder)=>{
        builder.addCase(RegisterPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(RegisterPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
                localStorage.setItem('name',action?.payload?.data?.name )
            }
        })
        builder.addCase(RegisterPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload){
                toast.error(action?.payload?.message)
            }
        })



        builder.addCase(LoginPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(LoginPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
                localStorage.setItem('name',action?.payload?.user?.name )
                localStorage.setItem('token',action?.payload?.token )
                state.logOutToggle = true
            }
        })
        builder.addCase(LoginPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload){
                toast.error(action?.payload?.message)
            }
        })



        builder.addCase(DashboardFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(DashboardFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(DashboardFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload){
                toast.error(action?.payload?.message)
            }
        })
    }
})

export const {Logout, RegLogout,check_token,NavigateToLogin,NavigateToHome } = AuthSlice.actions

export default AuthSlice.reducer