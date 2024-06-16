import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../Common/Layout';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ForgetPasswordPost } from '../Slices/UpdateAnd ForgetPaswordSlice';
import { useNavigate } from 'react-router-dom';
import SubmitLoader from './SubmitLoader';

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

export default function ForgetPassword() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, reset, setValue , watch, formState: { errors } } = useForm();

    console.log(watch(["email","first_school","newPassword"]))

    const {mutate, isPending } = useMutation({
        mutationFn : (data)=> dispatch(ForgetPasswordPost(data)),

        onSuccess : (response) =>{
            console.log("Password Updated Successfully.....",response)
            if (response?.payload?.success === true){
                navigate("/login");
                reset()
            }
        },

        onError : (error)=>{
            console.log(error)
        }
    })



  const onsubmit = (data) => {
    console.log("DATAAAA.....", data)

    mutate(data)
  };

  return (
    <Layout>

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{  marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forget Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onsubmit)} noValidate sx={{ mt: 1 }}>

            <TextField margin="normal" required fullWidth  id="email" label="Email" type='email'  {...register("email", { required: true })}  />
            <br />
            {errors.email?.type === 'required' && <span style={{ color: "red" }}>This Field is required</span>}

            <TextField margin="normal" required fullWidth  id="first_school" label="First School" type='text'  {...register("first_school", { required: true })}  />
            <br />
            {errors.first_school?.type === 'required' && <span style={{ color: "red" }}>This Field is required</span>}


            <TextField margin="normal" required fullWidth  id="newPassword" label="New Password" type='password'  {...register("newPassword", { required: true })}  />
            <br />
            {errors.newPassword?.type === 'required' && <span style={{ color: "red" }}>This Field is required</span>}
        
            <Button type="submit"  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              {isPending? <SubmitLoader/> : " Reset Password"}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>

    </Layout>

  );
}