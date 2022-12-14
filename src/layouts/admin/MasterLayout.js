import React from 'react'
import {Link, Route, Routes , Navigate } from 'react-router-dom'

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

import Footer from './Footer'
import Navbar from './Navbar'


import Sidebar from './Sidebar'

import routes from '../../routes/routes';

const MasterLayout = (props) => {
  return (
    <div className='sb-nav-fixed'>
        <Navbar/>
        <div id='layoutSidenav'>
             <div id='layoutSidenav_nav'>
                <Sidebar/> 
             </div>
             <div id="layoutSidenav_content">
                <main>
                    {/* <Routes>
                    {
                        routes.map((route,index)=>{
                            return(
                                route.element && (
                                    <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={(props)=>(
                                        <route.element {...props} />
                                    )}
                                    />
                                )
                            )
                        })
                    }       
                    <Navigate  from="admin" to ="/admin/dashboard" />                        
                    </Routes> */}
                    {props.element}
                </main>
                <Footer/>
             </div>
     </div>
    </div>
  )
}

export default MasterLayout