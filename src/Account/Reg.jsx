import React, { useState } from 'react'
import Layout from '../Common/Layout'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { RegisterPost } from '../Slices/AuthSlice'
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

export default function Reg() {

    const [image, setImage] = useState()

    const imageChange = (e)=>{
        setImage(e.target.files[0])
        console.log(e.target.files)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {mutate, ispending } = useMutation({
        mutationFn : (data) => dispatch(RegisterPost(data)),
        onSuccess : (response) =>{
            console.log("REGISTERED SUCCESSFULLY....", response)
            if (response?.payload?.status === true) {
                navigate("/")
            }
        },

        onError : (error)=>{
            console.log("ERROR IN REGISTER.....", error)
        }
    })

    const {register, watch, reset, setValue, formState : {errors}, handleSubmit} = useForm()

    console.log(watch(["name","email","mobile","password","first_school"]))

    const onsubmit = (data) => {
        console.log("DATA....",data)
        const formData = new FormData()
        formData.append("name",data?.name)
        formData.append("email",data?.email)
        formData.append("mobile",data?.mobile)
        formData.append("password",data?.password)
        formData.append("first_school",data?.first_school)
        formData.append("image", image)

        mutate(formData) 
      };





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
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 1 }}>

              <TextField margin="normal" required fullWidth id="name" label="Name" type='text' {...register("name", { required: true })} />
              <br />
              {errors.name?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}

              <TextField margin="normal" required fullWidth id="email" label="Email Address" type='email' {...register("email", { required: true })} />
              <br />
              {errors.email?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}

              <TextField margin="normal" required fullWidth id="mobile" label="Phone No" type='number' {...register("mobile", { required: true })} />
              <br />
              {errors.mobile?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}

              <TextField margin="normal" required fullWidth label="Password" type="password" id="password" {...register("password", { required: true })} />
              <br />
              {errors.password?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}
              {errors.mobile?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}

              <TextField margin="normal" required fullWidth label="First_school" type="text" id="first_school" {...register("first_school", { required: true })} />
              <br />
              {errors.first_school?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}


              <TextField margin="normal" required fullWidth type="file" id="image" {...register("image", { required: true })} name='image' onChange={imageChange} />
              <br />
              {errors.image?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}
              {
                image!== null && image!== undefined && image!== "" ? (
                <>
                <img src={URL.createObjectURL(image)} alt="" height="110px" />
                </>) : (<>{image=== "" && <p>Drag and Drop Image</p>}</>)
              }

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                Sign up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgetpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {"Don't have an account? Sign In"}
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
