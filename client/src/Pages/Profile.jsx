import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center my-2"
          src={user.avatar}
          alt="profile Image"
        />
        <input
          type="text"
          placeholder="Username"
          className="boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          id="email"
        />
        <input
          type="text"
          placeholder="Password"
          className="boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          id="password"
        />
        <button className="bg-gray-700 text-white p-3 rounded-lg hover:opacity-90 transition uppercase disabled:opacity-50">Update</button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-600 cursor-pointer">Delete account</span>
        <span className="text-red-600 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
