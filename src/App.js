import React, { useState,useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import classes from './App.module.css';
import About from "./components/about/About";
import Header from './components/header/Header';
import Resources from './components/resources/Resources';
import Home from "./components/home/Home";


function App() {

  let [someSites,setSomeSites] = useState([])
  useEffect(()=>{
    fetch('https://haveibeenpwned.com/api/v2/breach/DominosIndia').then(res=>res.json()).then(res=>setSomeSites(res))
  }
   ,[])

  return (
    <div className="App">
   <Header/>
  <div className={classes.context}>
    <Routes>
      <Route path ='/resources' element={<Resources someSites/>}></Route>
      <Route path ='/about' element={<About/>}></Route>
      <Route path ='/home' element={<Home someSites = {someSites}/>}></Route>
    </Routes>
  </div>
    </div>
  );
}

export default App;
