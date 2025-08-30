import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Sign_In from "./Pages/Sign_In";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Header from "./components/Header";
import Sign_Up from "./Pages/Sign_Up"

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sign-in" element={<Sign_In />}/>
        <Route path="/sign-up" element={<Sign_Up />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
