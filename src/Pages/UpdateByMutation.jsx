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
import { useNavigate, useParams } from 'react-router-dom';
import SubmitLoader from '../Account/SubmitLoader';
import { UpdateProductPost } from '../Slices/UpdateSlice';
import { DetailsProductFetch } from '../Slices/DetailsProductSlice';
import { useMutation, useQuery } from '@tanstack/react-query';

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




export default function UpdateByMutation() {
    const { id } = useParams()
    const [image, setImage] = React.useState()

    const imageChange = (e) => {
        setImage(e.target.files[0])
        console.log(e.target.files)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { loading, data, error, redirectToAllproducts } = useSelector((state) => {
        console.log("UPDATE_PRODUCT_STATE....", state?.updateproduct)
        return state?.updateproduct
    })

    const { register, watch, reset, setValue, formState: { errors }, handleSubmit } = useForm()

    console.log(watch(["name", "price", "description", "brand"]))

    // geting the Details Part.............................

    const getProduct = async () => {
        try {
            const response = await dispatch(DetailsProductFetch(id))
            const reg = {
                name: response?.payload?.data?.name,
                price: response?.payload?.data?.price,
                description: response?.payload?.data?.description,
                brand: response?.payload?.data?.brand,
                // image: response?.payload?.data?.image
            };
            reset(reg)
            return response?.payload?.data
        } catch (error) {
            return error
        }
    }

    const {isLoading, isPending, isError, data: detailsData, error: detailsError } = useQuery({
        queryKey: ['getprod'],
        queryFn: getProduct,
      })
    
    //   if (isPending) {
    //     return <span>Loading...</span>
    //   }
    
    //   if (isError) {
    //     return <span>Error: {detailsError.message}</span>
    //   }

      console.log("DETAILS___DATA....", detailsData)

      const {isPending : pending, mutate, isLoading : load} = useMutation({
        mutationFn : (formData)=> dispatch(UpdateProductPost({ id, formData })),
        onSuccess : (response) =>{
            console.log("UPDATED_Successfully....", response)
            if (response?.payload?.status === true){
                navigate("/allproducts")
            }
        },
        onError : (error)=>{
            console.log("Error while updating....", error)
        }
      })




    const onsubmit = async (data) => {
        console.log("DATA....", data)
        const formData = new FormData()
        formData.append("name", data?.name)
        formData.append("price", data?.price)
        formData.append("description", data?.description)
        formData.append("brand", data?.brand)
        formData.append("image", image)
        // console.log("XXXXXx", formData)

        mutate(formData)
    };

    // React.useEffect(() => {
    //     navigate(redirectToAllproducts)
    // }, [redirectToAllproducts])










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
                            Update Product
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onsubmit)} noValidate sx={{ mt: 1 }}>

                            <TextField margin="normal" required fullWidth id="name" label="Name" type='text' {...register("name", { required: true })}  />
                            <br />
                            {errors.name?.type === 'required' && <span style={{ color: "red" }}>This Field is required</span>}

                            <TextField margin="normal" required fullWidth id="price" label="Price" type='number' {...register("price", { required: true })} />
                            <br />
                            {errors.price?.type === 'required' && <span style={{ color: "red" }}>This Field is required</span>}

                            <TextField margin="normal" required fullWidth id="description" label="Description" type='text' {...register("description", { required: true })} />
                            <br />
                            {errors.description?.type === 'required' && <span style={{ color: "red" }}>This Field is required</span>}

                            <TextField margin="normal" required fullWidth id="brand" label="Brand" type='text' {...register("brand", { required: true })}  />
                            <br />
                            {errors.brand?.type === 'required' && <span style={{ color: "red" }}>This Field is required</span>}

                            <TextField margin="normal" required fullWidth id="image" type='file' accept="image/*" {...register("image", { required: true })} name='image' onChange={imageChange} />
                            <br />
                            {errors.image?.type === 'required' && <span style={{ color: "red" }}>This Field is required</span>}
                            {/* <TextField margin="normal" required fullWidth id="image" type='file' accept="image/*" name='image' onChange={imageChange} /> */}
                            {
                                image !== null && image !== undefined && image !== "" ? (
                                    <>
                                        <img src={URL.createObjectURL(image)} alt="" height="110px" />
                                    </>) : (<>
                                        {detailsData?.data?.data?.image === "" ? (
                                            <img
                                                height="70px"
                                                src={image}
                                                alt=""
                                                className="upload-img"
                                            />
                                        ) : (
                                            <img
                                                height="100px"
                                                src={`${detailsData?.data?.data?.image}`}
                                                alt=""
                                                className="upload-img"
                                            />
                                        )}
                                        {/* <img src={`${Prod_Details?.data?.data?.image}`} alt="" height="110px" /> */}
                                    </>
                                )}
                            {image === "" && (
                                <p>Drag or drop content here</p>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {pending ? (<><SubmitLoader /></>) : "UPDATE"}
                            </Button>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </Layout>

    );
}