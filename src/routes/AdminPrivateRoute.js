import { cleanup } from '@testing-library/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Route, Navigate , Redirect } from 'react-router-dom'
import MasterLayout from '../layouts/admin/MasterLayout'

const AdminPrivateRoute = ({...rest}) => {

    const [Authenticated, setAuthenticated] = useState(false)

    useEffect(() => {

        axios.get('/api/checkingAuthenticated').then(res=>{
            if(res.status===200){
                setAuthenticated(true);
            }
        }) 
      return () => {
        setAuthenticated(false);
      }
    }, [])
    
    
  return (
        
            <Route {...rest}
            render={ ({props, location}) => 
                Authenticated ?
                ( <MasterLayout {...props} /> ) :
                ( <Navigate to={{pathname: "/login", state: {from: location} }} /> ) 
            }
/>
   
        
  );
}

export default AdminPrivateRoute