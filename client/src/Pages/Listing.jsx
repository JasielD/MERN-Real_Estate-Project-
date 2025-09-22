import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation} from "swiper/modules"
import SwiperCore from "swiper"
import "swiper/swiper-bundle.css";


const Listing = () => {
    SwiperCore.use([Navigation]);
    const [listing,setListing]=useState(null)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)

    const params = useParams();

    useEffect(()=>{
        const fetchListing = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`/api/listing/get/${params.id}`)
                const data = res.data
                if(data.success === false){
                    setError(true);
                    setLoading(false)
                    return
                }
                setListing(data); 
                setLoading(false);    
                setError(false);
            } catch (error) {
               setError(true)
               setLoading(false) 
            }
    }
    fetchListing();
    },[])
  return (
    <div>
    {loading&&<p className='text-3xl text-center font-bold m-7'>Loading....</p>}
    {error&&<p className='text-3xl text-center font-bold m-7'>Something went wrong</p>}  
    {listing&&!error&&!loading&&(
        <>
        <Swiper navigation>
        {listing.imageUrls.map((img,index)=>(
            <SwiperSlide key={index}>
                <div className='h-[550px]' style={{background:`url(${img}) center no-repeat`,backgroundSize:"cover"}}></div>
            </SwiperSlide>
        ))}
        </Swiper>
        </>
    )}
    </div>
  )
}

export default Listing
