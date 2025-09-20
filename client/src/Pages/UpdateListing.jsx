import React,{useEffect, useState} from 'react'
import { supabase } from '../supabaseClient.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate,useParams } from "react-router-dom";

const UpdateListing = () => {
    const {user}=useSelector((state)=>state.user)
    const navigate = useNavigate()
    const params = useParams()
    const [files, setFiles] = useState([]);
    const [error,setError]=useState(false);
    const [loading,setLoading]= useState(false)
    const [uploading, setUploading] = useState(false);
    const [imageUploderror, setImageUploaderror] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [deletingIndex, setDeletingIndex] = useState(null);
    const [formData,setFormData] = useState({
        imageUrls:[],
        name:"",
        description:"",
        address:"",
        type:"rent",
        bedrooms:1,
        bathrooms:1,
        regularPrice:50,
        discountedPrice:0,
        offer:false,
        parking:false,
        furnished:false,
    })

    useEffect(()=>{
      const fetchListing = async()=>{
        const listingId = params.id
        const res = await axios.get(`/api/listing/get/${listingId}`)
        const data = res.data
        if(data.sucess===false){
          console.log(data.message)
        }
        setFormData(data)
      }
      fetchListing();
    },[])
    
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

    const handleImageUpload = async () => {
        if (files.length === 0 || files.length + formData.imageUrls.length > 6) {
             setImageUploaderror('You must select between 1 and 6 images.');
             return;
        }

        setUploading(true);
        setImageUploaderror(null);

        const promises = Array.from(files).map(file => storeImage(file));

        try {
            const newUrls = await Promise.all(promises);
            setFormData(prev => ({
                ...prev,
                imageUrls: [...prev.imageUrls, ...newUrls]
}));
        } catch (uploadError) {
            setImageUploaderror(uploadError.message);
        } finally {
            setUploading(false);
        }
    };
 
    
      const handleDeleteImage = async (indexToDelete) => {
        const urlToDelete = formData.imageUrls[indexToDelete];
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
            setFormData(prev => ({
            ...prev,
            imageUrls: prev.imageUrls.filter((_, index) => index !== indexToDelete)
            }));

        } catch (error) {
            console.error('Error deleting image:', error);
            // Optionally, set an error state to show the user
        } finally {
            setDeletingIndex(null); // Reset loading state
        }
    };

    const handleChange = (e)=>{
        if(e.target.id==="rent"||e.target.id==="sale"){
            setFormData({
                ...formData,
                type:e.target.id
            })
        }
        if(e.target.id === "parking"||e.target.id==="furnished"||e.target.id==="offer"){
            setFormData({
                ...formData,
                [e.target.id] : e.target.checked
            })
        }
        if(e.target.type ==="number"||e.target.type==="text"||e.target.type==="textarea"){
            setFormData({
                ...formData,
                [e.target.id]:e.target.value
            })
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(+formData.regularPrice<=+formData.discountedPrice){
            return setError("Discounted price must be less than regular price!!")
        }
        try {
            setLoading(true)
            setError(false)
            const res = await axios.put(`/api/listing/update/${params.id}`,{...formData,userRef:user._id,})
            setLoading(false);
            const data = res.data
            if(data.sucess===false){
                setError(data.message)
            }
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message)
            setLoading(false);
        }
    }

  return (
    <main className='max-w-4xl px-3 mx-auto'>
      <h1 className='text-3xl text-center my-6 font-bold'>
        Update your Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='Name' id="name" required onChange={handleChange} value={formData.name}
             className='boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' />
            <textarea type="text" placeholder='Description' id="description" required onChange={handleChange} value={formData.description}
             className='boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition'/>
            <input type="text" placeholder='Address' id='address' required onChange={handleChange} value={formData.address}
            className='boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' />
            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-1'>
                    <input type="checkbox" id='sale' className='w-5'
                    onChange={handleChange} checked={formData.type==='sale'}/>
                    <span>Sell</span>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" id='rent' className='w-5'
                    onChange={handleChange} checked={formData.type==='rent'}/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" id='parking' className='w-5'
                    onChange={handleChange} checked={formData.parking}/>
                    <span>Parking Spot</span>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" id='furnished' className='w-5'
                    onChange={handleChange} checked={formData.furnished}/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" id='offer' className='w-5'
                    onChange={handleChange} checked={formData.offer}/>
                    <span>Offer</span>
                </div>
            </div>
            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-1 items-center'>
                    <input type='number' id="bedrooms" required min="1" max="10" 
                    className='boder rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition' 
                    onChange={handleChange} value={formData.bedrooms}/>
                    <p>Bedrooms</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <input type='number' id="bathrooms" required min="1" max="10" 
                    className='boder rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition'
                    onChange={handleChange} value={formData.bathrooms} />
                    <p>Bathrooms</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <input type='number' id="regularPrice" required min="50" max="100000000" 
                    className='boder rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition'
                    onChange={handleChange} value={formData.regularPrice} />
                    <div className='flex flex-col items-center'>
                    <p>Regular Price</p>
                    <span className='text-xs'>($ / month)</span>
                    </div>
                </div>
                {formData.offer&&(
                    <div className='flex gap-1 items-center'>
                    <input type='number' id="discountedPrice" required min="0" max="100000000" 
                    className='boder rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition'
                    onChange={handleChange} value={formData.discountedPrice} />
                    <div className='flex flex-col items-center'>
                    <p>Discounted Price</p>
                    <span className='text-xs'>($ / month)</span>
                    </div>
                </div>
                )}
                
            </div>
        
        </div>
        <div>
            <p className='font-bold m-2'>Images:
                <span className='font-normal text-gray-500 ml-2'>The first Image will be the cover (max 6)</span>
            </p>
            <div className='flex gap-3'>
                <input onChange={(e)=>setFiles(e.target.files)}
                 type="file" id="images"
                 accept='.jpg,.png,.jpeg' multiple 
                 className='border border-gray-400 w-full p-3 rounded' />
                <button type='button' disabled={uploading}
                 onClick={handleImageUpload} 
                className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
            </div>
            <p className='text-red-600 mt-2'>{imageUploderror?imageUploderror:""}</p>
            {formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=>(
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
        <button disabled={loading || uploading} className='bg-gray-700 text-white p-3 rounded-lg hover:opacity-90 transition uppercase disabled:opacity-50 w-full mt-4'>
            {loading?"Updating...":"Update Listing"}</button>
        <p className='text-red-600 mt-2'>{error}</p>
        </div>
      </form>
    </main>
  );
}

export default UpdateListing


