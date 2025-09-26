import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate,useLocation} from "react-router-dom"
import ListingCard from '../components/ListingCard'

const Search = () => {
  const [sidebarData,setSidebarData]=useState({
    searchTerm:'',
    type:'all',
    parking:false,
    furnished:false,
    offer:false,
    sort:"created_at",
    order:"desc"
  })
  const [loading,setLoading]=useState(false)
  const [listing,setListing]=useState([])
  const [showmore,setShowmore]=useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromURL = urlParams.get("searchTerm")
    const typeFromURL = urlParams.get("type")
    const parkingFromURL = urlParams.get("parking")
    const furnishedFromURL = urlParams.get("furnished")
    const offerFromURL = urlParams.get("offer")
    const sortFromURL = urlParams.get("sort")
    const orderFromURL = urlParams.get("order")

    if(searchTermFromURL||typeFromURL||parkingFromURL||furnishedFromURL||offerFromURL||sortFromURL||orderFromURL){
      setSidebarData({
        searchTerm:searchTermFromURL||"",
        type:typeFromURL||"all",
        parking:parkingFromURL==="true"?true:false,
        furnished:furnishedFromURL==="true"?true:false,
        offer:offerFromURL==="true"?true:false,
        sort:sortFromURL||"created_at",
        order:orderFromURL||"desc"
      })
    }

    const fetchListing = async()=>{
      setLoading(true);
      setShowmore(false);
      const searchQuery = urlParams.toString()
      const res = await axios.get(`/api/listing/get?${searchQuery}`);
      const data = res.data;
      if(data.length>8){
        setShowmore(true)
      }else{
        setShowmore(false)
      }
      setListing(data)
      setLoading(false)
    }
    fetchListing();
  },[location.search])

  const handleChange = (e)=>{
    if(e.target.id === "all"||e.target.id==="rent"||e.target.id==="sale"){
      setSidebarData({...sidebarData, type: e.target.id})
    }
    if(e.target.id==="searchTerm"){
      setSidebarData({...sidebarData,searchTerm:e.target.value})
    }
    if(e.target.id==="parking"||e.target.id==="furnished"||e.target.id==="offer"){
      setSidebarData({...sidebarData,[e.target.id]:e.target.checked || e.target.checked === "true"?true:false})
    }
    if(e.target.id === "sort_order"){
      const sort = e.target.value.split("_")[0]||"created_at"
      const order = e.target.value.split("_")[1]||"desc"
      setSidebarData({...sidebarData,sort,order});
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set("searchTerm",sidebarData.searchTerm)
    urlParams.set("type",sidebarData.type)
    urlParams.set("parking",sidebarData.parking)
    urlParams.set("furnished",sidebarData.furnished)
    urlParams.set("offer",sidebarData.offer)
    urlParams.set("sort",sidebarData.sort)
    urlParams.set("order",sidebarData.order)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const onShowmoreClick = async()=>{
   const numberOfListings = listing.length
   const startIndex = numberOfListings
   const urlParams = new URLSearchParams(location.search)
   urlParams.set("startIndex",startIndex);
   const searchQuery = urlParams.toString()
   const res = await axios.get(`/api/listing/get?${searchQuery}`)
   const data = res.data
   setListing([...listing,...data]);
   if(data.length<9){
    setShowmore(false);
   }
  }
    return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 border-gray-300 md:border-r-2 md:min-h-screen md:border-gray-300'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
          <label className='whitespace-nowrap font-bold'>Search Term</label>
          <input className='shadow-lg rounded-lg p-3 w-full bg-white'
          placeholder='Search...'
          type='text'
          id='searchTerm'
          value={sidebarData.searchTerm}
          onChange={handleChange} />
          </div>
          <div className='flex gap-3 flex-wrap'>
            <label className='font-bold'>Type:</label>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="all"
              onChange={handleChange} checked={sidebarData.type==="all"}/>
              <span> Rent & Sale</span>
            </div>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="rent"
              onChange={handleChange} checked={sidebarData.type==="rent"}/>
              <span> Rent</span>
            </div>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="sale"
               onChange={handleChange} checked={sidebarData.type==="sale"}/>
              <span>Sale</span>
            </div>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="offer"
               onChange={handleChange} checked={sidebarData.offer}/>
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-3 flex-wrap'>
            <label className="font-bold">Ammenities:</label>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="parking"
               onChange={handleChange} checked={sidebarData.parking}/>
              <span> Parking</span>
            </div>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="furnished"
               onChange={handleChange} checked={sidebarData.furnished}/>
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-bold'>Sort:</label>
            <select onChange={handleChange}
            defaultValue={"created_at_desc"} 
            id="sort_order"
             className='p-3 rounded-lg shadow-lg bg-white'>
              <option value={"regularPrice_desc"}>Price high to low</option>
              <option value={"regularPrice_asc"}>Price low to high</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
            </select>
          </div>
          <button className='bg-gray-700 text-white p-3 rounded-lg hover:opacity-90 transition uppercase disabled:opacity-50'>Search</button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-2xl font-semibold mt-3 p-3 border-b-2 border-gray-300'>Listing Results</h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listing.length === 0 &&(
            <p className='text-xl text-gray-700'>No Listing Found...</p>
          )}
          {loading&&<p className='text-xl text-gray-700 text-center w-full'>Loading...</p>}
          {!loading && listing && listing.map((listing)=> <ListingCard key={listing._id} listing={listing}/>)}
          {showmore&&(
            <button onClick={onShowmoreClick}
            className='text-green-600 hover:underline p-7 text-center w-full' >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search

