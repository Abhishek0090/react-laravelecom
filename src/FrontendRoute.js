import React from 'react'
import { Route, Router } from 'react-router-dom'
import About from './components/frontend/About'
import Contact from './components/frontend/Contact'
import Home from './components/frontend/Home'

const FrontendRoute = () => {
  return (
    <div>
         

        <Route exact path="/" element={<Home />} /> 
        <Route exact  path="/about" element={<About/>}/>
        <Route exact  path="/contact" element={<Contact/>}/>

       
    </div>
  )
}

export default FrontendRoute