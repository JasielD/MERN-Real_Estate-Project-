import axios from "axios";
import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";

const Sign_In = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })}
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post("/api/auth/signin", formData, {
          headers:{
            "Content-Type":"application/json",
          },
        });
        const data = response.data;
        console.log(data);
        setError(null);
        navigate("/");
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
      } finally{
        setLoading(false);
      }
      
    }
  return (
    <div className="p-3 md:max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full sm:w-1/3 mx-auto">
        
        <input
          type="email"
          placeholder="Email"
          className="boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          id="email"
          onChange={handleFormChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="boder rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          id="password"
          onChange={handleFormChange}
        />
        <button disabled={loading} type="submit" className="bg-gray-700 text-white p-3 rounded-lg hover:opacity-90 transition uppercase disabled:opacity-50">
          {loading ? "Loading..." : "Sign In"}
        </button>
      <div className="flex gap-2 mt-2 text-sm">
        <p className="text-gray-600">Don't have an account?</p>
        <Link to={"sign-up"}>
          <span className="text-blue-600 hover:underline font-medium">
            Sign Up
          </span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Sign_In;
