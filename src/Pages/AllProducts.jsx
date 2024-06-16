import React from 'react'
import Layout from '../Common/Layout'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AllProductFetch } from '../Slices/AllProductSlice';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { reset_redirectToAllproducts } from '../Slices/AddProductSlice';
import { DeleteProductPost } from '../Slices/DeleteProductSlice';
import Swal from 'sweetalert2'
import { reset__redirectToAllproducts } from '../Slices/UpdateSlice';



export default function AllProducts() {
    const dispatch = useDispatch()

    const [page, setPage] = React.useState(1);
    const itemsPerPage = 5;
    const pageChange = (event, pageNo) => {
        // alert(pageNo);
        setPage(pageNo);
    };

    const getAllProducts = async () => {
        try {
            const response = await dispatch(AllProductFetch())
            return response?.payload?.data
        } catch (error) {
            return error
        }
    }

    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['allproducts'],
        queryFn: getAllProducts,
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    console.log("DAATTTAAAAAA.....", data)

    const removeProduct = () => {
        localStorage.removeItem("prodName")
    }

    refetch(dispatch(reset_redirectToAllproducts()))
    refetch(dispatch(reset__redirectToAllproducts()))

    const deleteProduct = async (idd) => {
        // await dispatch(DeleteProductPost(idd))
        // refetch()
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                const outcome = dispatch(DeleteProductPost(idd))
                return outcome
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        }).then((outcome) => {
            refetch()

        })
    }

    const paginatedData = data?.slice(    // Here data is comming from useQuery
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );


    return (
        <Layout>

            <Box marginTop="100px">
                <TableContainer component={Paper}>
                    <Button variant='contained' color='secondary' onClick={removeProduct}><Link to="/addproduct" style={{ textDecoration: "none", color: "white" }}> Add Product </Link> </Button>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Sl.No</TableCell>
                                <TableCell align="center">Thumbnail</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Brand</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                Array.isArray(paginatedData) && paginatedData.map((item, index) => {
                                    return (
                                        <>
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center"><img src={item.image} alt="" height="40px" /></TableCell>
                                                <TableCell align="center">{item.name}</TableCell>
                                                <TableCell align="center">{item._id}</TableCell>
                                                <TableCell align="center">{item.brand}</TableCell>
                                                <TableCell align="center">{item.description}</TableCell>
                                                <TableCell align="center">{item.price}</TableCell>
                                                <TableCell align="center">
                                                    <Button><Link to={`/productdetails/${item._id}`}> <VisibilityOutlinedIcon color='secondary' /> </Link></Button>
                                                    <Button onClick={removeProduct}><Link to={`/updateproduct/${item._id}`}> <EditNoteOutlinedIcon color='info' /> </Link></Button>
                                                    {/* <Button onClick={removeProduct}><Link to={`/updatebymutation/${item._id}`}> <EditNoteOutlinedIcon color='info' /> </Link></Button> */}
                                                    <Button onClick={() => deleteProduct(item._id)}><DeleteSweepOutlinedIcon color='warning' /></Button>
                                                </TableCell>
                                            </TableRow>


                                        </>
                                    )
                                })
                            }


                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2}>
                    <Typography>Page: {page}</Typography>
                    {/* <Pagination count={5} page={page} onChange={pageChange} /> */}
                    <Pagination count={Math.ceil(data.length / itemsPerPage)} page={page} onChange={pageChange} />
                </Stack>
            </Box>

        </Layout>
    )
}
