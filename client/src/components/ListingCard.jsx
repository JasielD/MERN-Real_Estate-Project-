import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from "react-icons/md";

const ListingCard = ({listing}) => {
  return (
    <div className='bg-white shadow hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt="listing card image"
            className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className=' truncate text-lg font-semibold text-gray-800'>{listing.name}</p>
                <div className='flex items-center gap-1 '>
                    <MdLocationOn className='h-4 w-4 text-green-600'/>
                    <p className='text-sm text-gray-600 truncate'>{listing.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
                <p className='font-semibold mt-2 text-gray-600'>${listing.offer?listing.discountedPrice.toLocaleString() : listing.regularPrice.toLocaleString()}
                    {listing.type === "rent" && "/month"}
                </p>
                <div className='text-gray-700 flex gap-4'>
                    <div className='text-xs font-bold'>
                        {listing.bedrooms>1?`${listing.bedrooms} beds`:`${listing.bedrooms} bed`}
                    </div>
                    <div className='text-xs font-bold'>
                        {listing.bathrooms>1?`${listing.bathrooms} baths`:`${listing.bathrooms} bath`}
                    </div>
                    
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ListingCard
