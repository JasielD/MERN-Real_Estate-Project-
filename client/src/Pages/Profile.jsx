import React, { useRef,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { updateAvatar,updateUserFailure,updateUserStart,updateUserSuccess } from "../redux/user/userSlice.js"; 
import axios from "axios"; 

const Profile = () => {
   const { user,loading,error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", user._id);

    const res = await fetch("/api/auth/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      // update redux store directly
      dispatch(updateAvatar(`${data.avatarUrl}?t=${Date.now()}`));
    }
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(`/api/user/update/${user._id}`, formData,{
         withCredentials: true,  // send cookies
      });
      console.log(res);
      const data = res.data;
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      }else{
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      }
    } catch (err) {
      dispatch(updateUserFailure(err.response.data.message));
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="file" className="hidden" ref={fileRef} accept="image/*" onChange={handleFileChange} />
        <div className="relative w-24 h-24 self-center my-2">
          <img
            className="rounded-full w-24 h-24 object-cover cursor-pointer"
            src={user.avatar}
            alt="profile Image"
            onClick={() => fileRef.current.click()}
          />
          <div
            onClick={() => fileRef.current.click()}
            className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-1.414a2 2 0 01.586-1.414z"
              />
            </svg>
          </div>
        </div>
        <input
          type="text"
          placeholder="Username"
          className="boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          defaultValue={user.userName}
          id="userName"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          defaultValue={user.email}
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Password"
          className="boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-gray-700 text-white p-3 rounded-lg hover:opacity-90 transition uppercase disabled:opacity-50">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-600 cursor-pointer">Delete account</span>
        <span className="text-red-600 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700">{error?error:""}</p>
      <p className="text-green-700">{updateSuccess?"User Updated Successsfully!!":""}</p>
    </div>
  );
};

export default Profile;
