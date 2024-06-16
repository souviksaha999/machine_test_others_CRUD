// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import { useEffect } from 'react';
import { check_token } from './Slices/AuthSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reg from './Account/Reg';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Login from './Account/Login';
import { useDispatch } from 'react-redux';
import Dashboard from './Account/Dashboard';
import AllProducts from './Pages/AllProducts';
import AddProduct from './Pages/AddProduct';
import UpdateProduct from './Pages/UpdateProduct';
import DetailsProduct from './Pages/DetailsProduct';
import UpdateByMutation from './Pages/UpdateByMutation';
import UpdatePassword from './Account/UpdatePassword';
import ForgetPassword from './Account/ForgetPassword';

// Create a client
const queryClient = new QueryClient()


function App() {

  const PrivateRoute = ({children})=>{
    const token = localStorage.getItem("token")
    return token!== "" && token!== null && token!== undefined ? (children) : (<Navigate to="/login" />)
  }

  const PublicRoute = [
    // { path: "/", component: <Home /> },
    { path: "/reg", component: <Reg /> },
    { path: "/login", component: <Login /> },
    { path: "/forgetpassword", component: <ForgetPassword /> },
  ]
  const ProtectedRoute = [
    { path: "/", component: <Home /> },
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/allproducts", component: <AllProducts /> },
    { path: "/addproduct", component: <AddProduct /> },
    { path: "/productdetails/:id", component: <DetailsProduct /> },
    { path: "/updateproduct/:id", component: <UpdateProduct /> },
    // { path: "/updatebymutation/:id", component: <UpdateByMutation /> },
    { path: "/updatepassword", component: <UpdatePassword /> },


  ]

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(check_token())
  }, [])

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <QueryClientProvider client={queryClient}>

        <Router>
          <Routes>
            {
              Array.isArray(PublicRoute) && PublicRoute.map((item, index) => {
                return (
                  <>
                    <Route path={item.path} element={item.component} />
                  </>
                )
              })
            }
            {
              Array.isArray(PublicRoute) && ProtectedRoute.map((item, index) => {
                return (
                  <>
                    <Route path={item.path} element={<PrivateRoute>{item.component}</PrivateRoute>} />
                  </>
                )
              })
            }
            {/* <Route path='/' element={<Home />} /> */}
          </Routes>
        </Router>
      </QueryClientProvider>

    </>

  );
}

export default App;
