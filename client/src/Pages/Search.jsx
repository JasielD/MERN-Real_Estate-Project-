import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 border-gray-300 md:border-r-2 md:min-h-screen md:border-gray-300'>
        <form className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
          <label className='whitespace-nowrap font-bold'>Search Term</label>
          <input className='shadow-lg rounded-lg p-3 w-full bg-white'
          placeholder='Search...'
          type='text'
          id='searchTerm' />
          </div>
          <div className='flex gap-3 flex-wrap'>
            <label className='font-bold'>Type:</label>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="all"/>
              <span> Rent & Sale</span>
            </div>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="rent"/>
              <span> Rent</span>
            </div>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="sale"/>
              <span>Sale</span>
            </div>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="offer"/>
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-3 flex-wrap'>
            <labe className="font-bold">Ammenities:</labe>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="parking"/>
              <span> Parking</span>
            </div>
            <div className='flex gap-1'>
              <input type='checkbox'className='w-5' id="furnished"/>
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-bold'>Sort:</label>
            <select id="sort_order" className='p-3 rounded-lg shadow-lg bg-white'>
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className='bg-gray-700 text-white p-3 rounded-lg hover:opacity-90 transition uppercase disabled:opacity-50'>Search</button>
        </form>
      </div>
      <div className=''>
        <h1 className='text-2xl font-semibold mt-3 p-3 border-b-2 border-gray-300'>Listing Results</h1>
      </div>
    </div>
  )
}

export default Search

