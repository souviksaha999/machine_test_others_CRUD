import React from 'react'
import Layout from '../Common/Layout'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { DashboardFetch } from '../Slices/AuthSlice'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Dashboard() {

    const dispatch = useDispatch()

    const getUserDetails = async()=>{
        try {
            const response = await dispatch(DashboardFetch())
            return response?.payload?.data[0]
        } catch (error) {
            return error
        }
    }

    const {isPending, isError, data, error, refetch} = useQuery({
        queryKey : ["dashboard"],
        queryFn : getUserDetails
    })

    if (isPending) {
        return <h1>Loading...</h1>
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>
      }

      console.log("DAAATTAAAAA.....", data)


  return (
    <Layout>
        <div style={{display : "flex", justifyContent: "center", marginTop : "30vh"}}>
        <Card sx={{ maxWidth: 500 }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
      {/* <img src={data?.image} alt="fg" /> */}
      {/* <img src={`https://webskitters-student.onrender.com/user/photo/${data?.image}`} alt="fgj" /> */}
      <img src="images.jpeg" alt="cgb" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name : {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Id : {data?._id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email : {data?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mobile : {data?.mobile}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          First School : {data?.first_school}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
        </div>
        
    </Layout>
  )
}
