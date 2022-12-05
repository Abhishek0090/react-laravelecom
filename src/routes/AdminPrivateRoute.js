import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import MasterLayout from '../layouts/admin/MasterLayout'

const AdminPrivateRoute = ({...rest}) => {
  return (
        <>

            <Route {...rest}
             render={({props,location})=>
                  localStorage.getItem('auth_token')?
                  ( <MasterLayout {...props} /> ):
                  ( <Navigate to={{pathname:"/login" , state : {from : location} }}/> ) 
            }    
               
            />
        </>
        
  );
}

export default AdminPrivateRoute