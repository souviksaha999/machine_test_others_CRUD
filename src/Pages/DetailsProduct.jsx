import React from 'react'
import Layout from '../Common/Layout'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { DetailsProductFetch } from '../Slices/DetailsProductSlice'
import { useQuery } from '@tanstack/react-query'
import { Box } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function DetailsProduct() {
    const { id } = useParams()
    const dispatch = useDispatch()

    const getDetails = async () => {
        try {
            const response = await dispatch(DetailsProductFetch(id))
            return response?.payload?.data
        } catch (error) {
            return error
        }
    }

    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['productdetails'],
        queryFn: getDetails,
    })

    if (isPending) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    console.log("Dataaaaaa....", data)




    return (
        <Layout>
            <Box component="div" sx={{ display: "flex", justifyContent: "center", marginTop: "30vh" }}>

                <Card sx={{ maxWidth: 600 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={data?.image}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Name : {data?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Brand : {data?.brand}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Id : {data?._id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Description : {data?.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price : {data?.price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Box>
        </Layout>
    )
}
