import React from 'react'
import { Link } from 'react-router-dom'

const Sign_Up = () => {
  return (
    <div className='p-3 md:max-w-7xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 w-1/3 mx-auto'>
        <input type="text" placeholder='Username' className='boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' />
        <input type="email" placeholder='Email' className='boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' />
        <input type="password" placeholder='Password' className='boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' />
        <button className='bg-gray-700 text-white p-3 rounded-lg hover:opacity-90 transition uppercase disabled:opacity-50'>
          Sign Up
        </button>
      </form>
      <div className='flex justify-center gap-2 mt-5 text-sm'>
        <p className='text-gray-600'>have an account?</p>
        <Link to={"sign-in"}>
        <span className='text-blue-600 hover:underline font-medium'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default Sign_Up
