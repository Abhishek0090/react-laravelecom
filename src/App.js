 
import { Route, BrowserRouter as Router, Switch, Routes, Navigate, useNavigate   } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Home from './components/frontend/Home';
import MasterLayout from './layouts/admin/MasterLayout';
import axios from 'axios';
import AdminPrivateRoute from './routes/AdminPrivateRoute';
import { useEffect, useState } from 'react';

axios.defaults.withCredentials = true;

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : ``;
    return config;
    }
)

axios.defaults.baseURL = "http://localhost:8000/"

function App() {

     const [Authenticated, setAuthenticated] = useState(false)

      useEffect(() => {

          axios.get('/api/checkingAuthenticated').then(res=>{
              if(res.status===200){
                  setAuthenticated(true);
              }else{
                setAuthenticated(false);
              }
          })  
           
      }, [])
  // const Navigate = useNavigate();
  return (
    <div className="App">
    <Router>

    <Routes>
       
        <Route path="/" element={<Home />} /> 
        

      <Route path="/login" element=  {localStorage.getItem('auth_token')?<Navigate to="/" />:<Login/>} />
        
     
      <Route path="/register" element= {localStorage.getItem('auth_token')?<Navigate to="/" />:<Register/>} />
         
    
        {/* <Route path="/admin" element={<MasterLayout />} />  */}
        <Route path='/admin/dashboard' element={<MasterLayout element={<Dashboard/>}/>}/>
        <Route path='/admin/profile' element={<MasterLayout element={<Profile/>} />}/>  

        <Route path="/admin"   render={Authenticated ?
                ( <MasterLayout   /> ):
                 ( <Navigate to="/login"  replace={true}/> ) }  />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
