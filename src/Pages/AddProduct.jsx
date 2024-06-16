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
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Common/Layout';
import { AddProductPost } from '../Slices/AddProductSlice';
import { useNavigate } from 'react-router-dom';
import SubmitLoader from '../Account/SubmitLoader';

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





export default function AddProduct() {

    const [image, setImage] = React.useState()

    const imageChange = (e)=>{
        setImage(e.target.files[0])
        console.log(e.target.files)
    }

    const dispatch = useDispatch()

    const {loading,data,error,redirectToAllproducts} = useSelector((state)=>{
        console.log("ADD_PRODUCT_STATE....", state?.addproduct)
        return state?.addproduct
    })

     const {register, watch, reset, setValue, formState : {errors}, handleSubmit} = useForm()

    console.log(watch(["name","price","description", "brand"]))

    const onsubmit = (data) => {
       console.log("DATA....", data)
       const formData = new FormData()
        formData.append("name",data?.name)
        formData.append("price",data?.price)
        formData.append("description",data?.description)
        formData.append("brand",data?.brand)
        formData.append("image", image)

        dispatch(AddProductPost(formData))
      };

      const navigate = useNavigate()
      React.useEffect(()=>{
        const redirectUser = ()=>{
            const name = localStorage.getItem("prodName")
            const isInAddProductPage = window.location.pathname.toLowerCase() === "/addproduct"
            if (name!== null && name!== undefined && name!== ""){
                isInAddProductPage && navigate("/allproducts")
            }
        }
        redirectUser()
      },[redirectToAllproducts])





  return (
    <Layout>

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onsubmit)} noValidate sx={{ mt: 1 }}>
            
          <TextField margin="normal" required fullWidth id="name" label="Name" type='text' {...register("name", { required: true })} />
              <br />
              {errors.name?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}

          <TextField margin="normal" required fullWidth id="price" label="Price" type='number' {...register("price", { required: true })} />
              <br />
              {errors.price?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}

          <TextField margin="normal" required fullWidth id="description" label="Description" type='text' {...register("description", { required: true })} />
              <br />
              {errors.description?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}

          <TextField margin="normal" required fullWidth id="brand" label="Brand" type='text' {...register("brand", { required: true })} />
              <br />
              {errors.brand?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}

          <TextField margin="normal" required fullWidth id="image" type='file' {...register("image", { required: true })} name='image' onChange={imageChange} />
              <br />
              {errors.image?.type === 'required' && <span style={{color : "red"}}>This Field is required</span>}
              {
                image!== null && image!== undefined && image!== "" ? (
                <>
                <img src={URL.createObjectURL(image)} alt="" height="110px" />
                </>) : (<>{image=== "" && <p>Drag and Drop Image</p>}</>)
              }

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             {loading? (<><SubmitLoader /></>) : "ADD" }
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </Layout>

  );
}