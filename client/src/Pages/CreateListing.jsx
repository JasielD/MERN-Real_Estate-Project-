import React from 'react'

const CreateListing = () => {
  return (
    <main className='max-w-4xl px-3 mx-auto'>
      <h1 className='text-3xl text-center my-6 font-bold'>
        Create Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='Name' id="name" required
             className='boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' />
            <textarea type="text" placeholder='Description' id="description" required
             className='boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition'/>
            <input type="text" placeholder='Address' id='address' required
            className='boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' />
            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-1'>
                    <input type="checkbox" id='sale' className='w-5'/>
                    <span>Sell</span>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" id='rent' className='w-5'/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" id='parking' className='w-5'/>
                    <span>Parking Spot</span>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" id='furnished' className='w-5'/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" id='offer' className='w-5'/>
                    <span>Offer</span>
                </div>
            </div>
            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-1 items-center'>
                    <input type='number' id="bedrooms" required min="1" max="10" 
                    className='boder rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' />
                    <p>Bedrooms</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <input type='number' id="bathrooms" required min="1" max="10" 
                    className='boder rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' />
                    <p>Bathrooms</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <input type='number' id="regularPrice" required min="1" max="10" 
                    className='boder rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' />
                    <div className='flex flex-col items-center'>
                    <p>Regular Price</p>
                    <span className='text-xs'>($ / month)</span>
                    </div>
                </div>
                <div className='flex gap-1 items-center'>
                    <input type='number' id="discountPrice" required min="1" max="10" 
                    className='boder rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' />
                    <div className='flex flex-col items-center'>
                    <p>Discounted Price</p>
                    <span className='text-xs'>($ / month)</span>
                    </div>
                </div>
            </div>
        
        </div>
        <div>
            <p className='font-bold m-2'>Images:
                <span className='font-normal text-gray-500 ml-2'>The first Image will be the cover (max 6)</span>
            </p>
            <div className='flex gap-3'>
                <input type="file" id="images" accept='.jpg,.png,.jpeg' multiple required className='border border-gray-400 w-full p-3 rounded' />
                <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
            </div>
        <button className='bg-gray-700 text-white p-3 rounded-lg hover:opacity-90 transition uppercase disabled:opacity-50 w-full mt-4'>Create Listing</button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing

