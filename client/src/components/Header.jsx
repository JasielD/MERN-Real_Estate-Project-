import React,{useEffect, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaSearch,FaBars,FaTimes } from "react-icons/fa";
import {useSelector} from 'react-redux'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user} = useSelector((state) => state.user)
  const [searchTerm,setSearchTerm]=useState('')
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermfromURL = urlParams.get('searchTerm');
    if(searchTermfromURL){
      setSearchTerm(searchTermfromURL);
    }
  },[location.search])
  return (
    <header className="bg-slate-200 shadow-lg">
      <div className="container flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Logo */}
        <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Jasiel</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        </Link>
        {/* search */}
        <form onSubmit={handleSubmit} className="flex items-center rounded-lg bg-slate-100 p-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button>
          <FaSearch className="text-slate-600"/>
          </button>
        </form>
        {/* Desktop Menu */}
        <ul className="flex gap-4">
          <Link to="/">
          <li className="hidden sm:inline text-slate-700 hover:font-bold">Home</li></Link>
          <Link to="/about">
          <li className="hidden sm:inline text-slate-700 hover:font-bold">About</li></Link>
          <Link to="/profile">
          {user?(
            <img className="rounded-full h-8 w-8 object-cover border-black hover:border-2" src={user.avatar} alt="profile"/>
          ):(
          <li className="hidden sm:inline text-slate-700 hover:font-bold">Sign in</li>
          )}
          </Link>  
        </ul>
        {/* Mobile Menu Button */}
         <button
          className="sm:hidden text-slate-700 text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        {/* Mobile Dropdown */}
      {isMenuOpen && (
        <ul className="sm:hidden flex flex-col items-center py-4 gap-4 shadow-md">
          <Link to="/">
          <li className="cursor-pointer">Home</li>
          </Link>
          <Link to="/about">
          <li className="cursor-pointer">About</li>
          </Link>
          <Link to="/Sign-in">
             <li className="cursor-pointer">Sign in</li>
          </Link>
        </ul>
      )}
      </div>
    </header>
  );
};

export default Header;
