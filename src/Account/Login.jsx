import React, { useState } from 'react'
import Layout from '../Common/Layout'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { LoginPost, RegisterPost } from '../Slices/AuthSlice'
import { useForm } from 'react-hook-form'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom'
import SubmitLoader from './SubmitLoader'
import { toast } from 'react-toastify'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

    const [load, setLoad] = useState(false)

    const {loading, data: authData, error} = useSelector((state)=>{
      console.log("AUTH_STATE...", state?.auth)
      return state?.auth
    }) 

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {mutate, ispending } = useMutation({
        mutationFn : (data) => dispatch(LoginPost(data)),
        onSuccess : (response) =>{
            console.log("LOG_IN SUCCESSFULLY....", response)
            if (response?.payload?.status === true){
              setLoad(false)
              navigate("/")
            }
        },

        onError : (error)=>{
            console.log("ERROR IN REGISTER.....", error)
            
        }
    })

    const {register, watch, reset, setValue, formState : {errors}, handleSubmit} = useForm()

    console.log(watch(["email","password"]))

    const onsubmit = (data) => {
       console.log("DATA....", data)
       setLoad(true)

       mutate(data)

      };

// if (ispending) {
//   return <h1>Loading....</h1>
// }


  return (
    <Layout>
            <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1718143047302-56837e2bf688?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{ my: 8, mx: 4, display: 'flex',  flexDirection: 'column',  alignItems: 'center',  }} >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="email" label="Email Address" type='email' {...register("email", { required: true })} />
              <br />
              {errors.email?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}

              <TextField margin="normal" required fullWidth label="Password" type="password" id="password" {...register("password", { required: true })} />
              <br />
              {errors.password?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}

              <Button  type="submit"  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                {/* {load? (<> <SubmitLoader />  <h6>Loading....</h6></>) : (<>Sign In</>)} */}
                {loading? (<> <SubmitLoader />  <h6>Loading....</h6></>) : (<>Sign In</>)}   {/* no need to take state for loading if we use useSelector() */}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgetpassword" variant="h6">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/reg" variant="h6">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </Layout>
  )
}
