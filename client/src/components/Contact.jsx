import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = ({listing}) => {
    const [landlord,setLandlord]=useState(null)
    const [message,setMessage]=useState('')

    useEffect(()=>{
        const fetchLandlord = async()=>{
            try {
               const res = await axios.get(`/api/user/${listing.userRef}`) 
               const data = res.data
               setLandlord(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchLandlord();

    },[listing.userRef])

    const handleTextarea = (e)=>{
        setMessage(e.target.value)
    }
  return (
    <div>
      {landlord&&(
        <div className='flex flex-col gap-3'>
            <p>Contact <span className='font-semibold'>{landlord.userName}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
            <textarea name='message' id='message' rows='2'
            value={message} onChange={handleTextarea} 
            placeholder='Enter your message here...'
            className='w-full shadow-sm p-3 rounded-lg '>   
            </textarea>
            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='text-center bg-gray-700 text-white p-3 uppercase rounded-lg hover:opacity-95'>
            send Message
            </Link>

        </div>
      )}
    </div>
  )
}

export default Contact
