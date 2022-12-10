import React from 'react'
import {Link, Route, Routes , Navigate } from 'react-router-dom'
import Navbar from './layouts/frontend/Navbar'
 
 
const FrontendLayout = (props) => {
  return (
    <div>
           <Navbar/>
             <div > 
                    {props.element}
                 
             </div>
      
    </div>
  )
}

export default FrontendLayout