 
import { Route, BrowserRouter as Router, Switch, Routes, Navigate, useNavigate   } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Home from './components/frontend/Home';
import MasterLayout from './layouts/admin/MasterLayout';
import axios from 'axios';
import AdminPrivateRoute from './routes/AdminPrivateRoute';
import { useEffect } from 'react';
import { useState } from 'react';
import swal from 'sweetalert';
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';

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

  // const Navigate = useNavigate();

  const [Authenticated, setAuthenticated] = useState(false)
  const [loading , setLoading]  = useState(true);

  useEffect(() => {

      axios.get('/api/checkingAuthenticated').then(res=>{
          if(res.status===200){
              setAuthenticated(true);
          }
          setLoading(false);
      }) 
    return () => {
      setAuthenticated(false);
       
    }
  }, [])

//message:unautheticated handler
  axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
    if(err.response.status === 401){
      swal('UnAuthorized',err.response.data.message,"Warning");
      Navigate('/');
    }
    return Promise.reject(err);
  });

  //for checking admin or user validation
  axios.interceptors.response.use(function (response){
    return response;
  },function (error){
    if(error.response.status === 403){ //accesss Denied
      swal("Forbidden",error.response.data.message,"warning");
      Navigate('/403');
    }else  if(error.response.status === 404){ //Page Not Found
      swal("404 Not Found","Url not found","warning");
      Navigate('/404');
    }
    return Promise.reject(error);
  }

  )

  if(loading){
    return <h2>Loading....</h2>
  }

  // const Navigate = useNavigate();
  return (
    <div className="App">
    <Router>

    <Routes>
       
        <Route path="/" element={<Home />} /> 
        {/* <Route path="/login" element={<Login/>} /> 
        <Route path="/register" element={<Register/>} />  */}

        <Route path="/403" element={<Page403/>}/>
        <Route path="/403" element={<Page404/>}/>

      <Route path="/login" element=  {localStorage.getItem('auth_token')?<Navigate to="/" />:<Login/>} />
        
     
      <Route path="/register" element= {localStorage.getItem('auth_token')?<Navigate to="/" />:<Register/>} />
         
    
      <Route path="/admin" element={<MasterLayout />} /> 
      <Route path='/admin/dashboard' element={<MasterLayout element={<Dashboard/>}/>}/>
     <Route path='/admin/profile' element={<MasterLayout element={<Profile/>} />}/>  

      
        <Route path="/admin" element={  Authenticated ?
                ( <MasterLayout   /> ) :
                ( <Navigate to="/login" />) }
                />
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
