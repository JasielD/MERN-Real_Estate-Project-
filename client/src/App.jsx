import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Sign_In from "./Pages/Sign_In";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Header from "./components/Header";
import Sign_Up from "./Pages/Sign_Up"
import PrivateRoute from "./components/privateRoute";
import CreateListing from "./Pages/CreateListing";
import UpdateListing from "./Pages/UpdateListing";
import Listing from "./Pages/Listing";

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sign-in" element={<Sign_In />}/>
        <Route path="/sign-up" element={<Sign_Up />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/listing/:id" element={<Listing />}/>  
        <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/create-listing" element={<CreateListing />}/>
        <Route path="/update-listing/:id" element={<UpdateListing />}/>  
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
