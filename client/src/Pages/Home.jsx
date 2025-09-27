import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation} from "swiper/modules"
import SwiperCore from "swiper"
import "swiper/swiper-bundle.css";
import ListingCard from "../components/ListingCard"

const Home = () => {
  const [offerListings,setOfferListings]=useState([]);
  const [rentListings,setRentListings]=useState([]);
  const [saleListings,setSaleListings]=useState([]);
  SwiperCore.use([Navigation])

  useEffect(()=>{
    const fetchOfferListing = async()=>{
      try {
        const res = await axios.get('/api/listing/get?offer=true&limit=4');
        const data = res.data;
        setOfferListings(data)
        fetchRentListing();   
      } catch (err) {
        console.log(err);
      }
    }

    const fetchRentListing = async()=>{
      try {
        const res = await axios.get('/api/listing/get?type=rent&limit=4');
        const data = res.data;
        setRentListings(data)
        fetchSaleListing();
      } catch (err) {
        console.log(err)
      }
    }

    const fetchSaleListing = async()=>{
      try {
        const res = await axios.get('/api/listing/get?type=sale&limit=4');
        const data = res.data;
        setSaleListings(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchOfferListing();
  },[])
  return (
    <div>
      {/*top */}
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-gray-700 font-bold text-3xl lg:text-6xl'>Find Your next <span className='text-gray-500'>Perfect</span>
        <br/>place with ease</h1>
        <div className='text-gray-500 text-xs lg:text-sm'>
          Jasiel Estate is the best place to find your next perfect place to live 
          <br/>
          we have a wide range of properties for you to choose from.
        </div>
        <Link to={"/search"}
        className='text-xs sm:text-sm text-blue-800 hover:underline font-bold'>
        Lets get started...
        </Link>
      </div>
      {/* swiper*/}
      <Swiper navigation>
      {saleListings && saleListings.length>0 && saleListings.map((listing)=>(
        <SwiperSlide>
          <div style={{background:`url(${listing.imageUrls[0]}) center no-repeat`,backgroundSize:"cover"}} className='h-[500px]' key={listing._id}></div>
        </SwiperSlide>
      ))}
      </Swiper>

      {/* listing cards */}
      <div className='flex flex-col gap-8 p-3 max-w-6xl mx-auto my-10'>
      {offerListings && offerListings.length>0 && (
        <div>
          <div className='my-3'>
          <h2 className='text-2xl font-semibold text-gray-600'>Recent offers</h2>
          <Link className='text-sm text-blue-800 hover:underline' to={"/search?offer=true"}>
          show more offers...
          </Link>
          </div>
          <div className='flex flex-wrap xl:flex-nowrap gap-6'>
            {offerListings.map((listing)=>(
              <ListingCard listing={listing} key={listing._id}/>
            ))}
          </div>
        </div>
      )}
      {rentListings && rentListings.length>0 && (
        <div>
          <div className='my-3'>
          <h2 className='text-2xl font-semibold text-gray-600'>Recent places for rent</h2>
          <Link className='text-sm text-blue-800 hover:underline' to={"/search?type=rent"}>
          show more places...
          </Link>
          </div>
          <div className='flex flex-wrap xl:flex-nowrap gap-6'>
            {rentListings.map((listing)=>(
              <ListingCard listing={listing} key={listing._id}/>
            ))}
          </div>
        </div>
      )}
      {saleListings && saleListings.length>0 && (
        <div>
          <div className='my-3'>
          <h2 className='text-2xl font-semibold text-gray-600'>Recent places for sale</h2>
          <Link className='text-sm text-blue-800 hover:underline' to={"/search?type=sale"}>
          show more places...
          </Link>
          </div>
          <div className='flex flex-wrap xl:flex-nowrap gap-6'>
            {saleListings.map((listing)=>(
              <ListingCard listing={listing} key={listing._id}/>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Home
