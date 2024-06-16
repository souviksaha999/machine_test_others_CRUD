import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from '../AuthSlice'
import AllProductsSlice from "../AllProductSlice"
import AddProductsSlice from "../AddProductSlice"
import DeleteProductsSlice from "../DeleteProductSlice"
import UpdateProductsSlice from "../UpdateSlice"
import DetailsProductsSlice from "../DetailsProductSlice"
import UpdateForgetPasswordSlice from "../UpdateAnd ForgetPaswordSlice"

export const store = configureStore({
  reducer: {
    auth : AuthSlice,
    allproducts : AllProductsSlice,
    addproduct : AddProductsSlice,
    deleteproduct : DeleteProductsSlice,
    detailsproduct : DetailsProductsSlice,
    updateproduct : UpdateProductsSlice,
    updatepassword : UpdateForgetPasswordSlice,
  },
})