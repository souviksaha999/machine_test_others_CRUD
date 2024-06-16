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
import { UpdatePasswordPost } from '../Slices/UpdateAnd ForgetPaswordSlice';
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

export default function UpdatePassword() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, reset, setValue , watch, formState: { errors } } = useForm();

    console.log(watch(["user_id","password"]))

    const {mutate, isPending } = useMutation({
        mutationFn : (data)=> dispatch(UpdatePasswordPost(data)),

        onSuccess : (response) =>{
            console.log("Password Updated Successfully.....",response)
            if (response?.payload?.success === true){
                navigate("/");
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
            Update Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onsubmit)} noValidate sx={{ mt: 1 }}>

            <TextField margin="normal" required fullWidth  id="user_id" label="User Id" type='text'  {...register("user_id", { required: true })}  />
            <br />
            {errors.user_id?.type === 'required' && <span style={{ color: "red" }}>This Field is required</span>}


            <TextField margin="normal" required fullWidth  id="password" label="Password" type='password'  {...register("password", { required: true })}  />
            <br />
            {errors.password?.type === 'required' && <span style={{ color: "red" }}>This Field is required</span>}
        
            <Button type="submit"  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              {isPending? <SubmitLoader/> : " Update Password"}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>

    </Layout>

  );
}