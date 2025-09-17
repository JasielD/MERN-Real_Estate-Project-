import React,{useState} from 'react'
import { supabase } from '../supabaseClient.js';

const CreateListing = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imageUploderror, setImageUploaderror] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [deletingIndex, setDeletingIndex] = useState(null);
    
    const storeImage = async(file)=>{
    return new Promise((resolve,reject)=>{
            const fileName = `${Date.now()}-${file.name}`
            const bucketName = "Listing-images"
            supabase.storage
            .from(bucketName)
            .upload(fileName,file)
            .then(({ data, error }) => {
                    if (error) {
                        console.error('Error uploading image:', error);
                        reject(new Error(`Failed to upload ${file.name}: ${error.message}`));
                    } else {
                        // Get the public URL of the uploaded file
                        const { data: { publicUrl } } = supabase.storage
                            .from(bucketName)
                            .getPublicUrl(fileName);
                        
                        console.log(`Successfully uploaded ${file.name}. URL: ${publicUrl}`);
                        resolve(publicUrl);
                    }
                });
        });
    }

    const handleSubmit = async () => {
        if (files.length === 0 || files.length + imageUrls.length > 6) {
             setImageUploaderror('You must select between 1 and 6 images.');
             return;
        }

        setUploading(true);
        setImageUploaderror(null);

        const promises = Array.from(files).map(file => storeImage(file));

        try {
            const newUrls = await Promise.all(promises);
            setImageUrls(prevUrls => [...prevUrls, ...newUrls]);
        } catch (uploadError) {
            setImageUploadError(uploadError.message);
        } finally {
            setUploading(false);
        }
    };
 
    
      const handleDeleteImage = async (indexToDelete) => {
        const urlToDelete = imageUrls[indexToDelete];
        // Extract the file name from the URL
        // e.g., https://<...>/Listing-images/12345-image.png -> 12345-image.png
        const fileName = urlToDelete.split('/').pop();
        
        if (!fileName) {
            console.error("Could not extract filename from URL");
            return;
        }

        setDeletingIndex(indexToDelete); // Set loading state for this specific image

        try {
            const bucketName = "Listing-images";
            // Supabase's remove method expects an array of file paths
            const { error } = await supabase.storage.from(bucketName).remove([fileName]);

            if (error) {
                throw error;
            }

            // If successful, update the local state to remove the image URL
            setImageUrls(prevUrls => prevUrls.filter((_, index) => index !== indexToDelete));

        } catch (error) {
            console.error('Error deleting image:', error);
            // Optionally, set an error state to show the user
        } finally {
            setDeletingIndex(null); // Reset loading state
        }
    };


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
                <input onChange={(e)=>setFiles(e.target.files)}
                 type="file" id="images"
                 accept='.jpg,.png,.jpeg' multiple required 
                 className='border border-gray-400 w-full p-3 rounded' />
                <button type='button' disabled={uploading}
                 onClick={handleSubmit} 
                className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
            </div>
            <p className='text-red-600 mt-2'>{imageUploderror?imageUploderror:""}</p>
            {imageUrls.length > 0 && imageUrls.map((url,index)=>(
                <div className='flex justify-between items-center p-3 shadow-lg mt-3'  key={index}>
                    <img src={url} alt='listing-img' className='w-20 h-20 rounded-lg object-contain'  />
                    <button
                        type="button"
                        // Pass a function to onClick to prevent it from being called on render
                        onClick={() => handleDeleteImage(index)}
                        disabled={deletingIndex === index} // Disable only the button for the image being deleted
                        className='p-3 text-red-700 rounded uppercase hover:shadow-lg disabled:opacity-50'
                    >Delete</button>
                </div>
            ))}
        <button className='bg-gray-700 text-white p-3 rounded-lg hover:opacity-90 transition uppercase disabled:opacity-50 w-full mt-4'>Create Listing</button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing

