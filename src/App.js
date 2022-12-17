 
import { Route, BrowserRouter as Router, Switch, Routes, Navigate, useNavigate   } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Home from './components/frontend/Home';
import MasterLayout from './layouts/admin/MasterLayout';
import axios from 'axios'; 
import { useEffect } from 'react';
import { useState } from 'react';
import swal from 'sweetalert'; 
import Category from './components/admin/category/Category';
import ViewCategory from './components/admin/category/ViewCategory';
import EditCategory from './components/admin/category/EditCategory';
import Product from './components/admin/product/Product';
import ViewProduct from './components/admin/product/ViewProduct';
import EditProduct from './components/admin/product/EditProduct';
import About from './components/frontend/About';
import Contact from './components/frontend/Contact';
import FrontendLayout from './FrontendLayout';
import ViewCategoryFrontend from './components/frontend/collections/ViewCategoryFrontend';
import ViewProductFrontend from './components/frontend/collections/ViewProductFrontend'; 
import ProductDetailsFrontend from './components/frontend/collections/ProductDetailsFrontend';
 


axios.defaults.baseURL = "http://localhost:8000/"
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});



function App() {

  // const Navigate = useNavigate();

  const [Authenticated, setAuthenticated] = useState(false)
  const [loading , setLoading]  = useState(true);

  useEffect(() => {

      axios.get('/api/checkingAuthenticated').then(res=>{
          if(res.status === 200){
              setAuthenticated(true);
          }
          setLoading(false);
      }) 
    return () => {
      setAuthenticated(false); 
      setLoading(true);
    }
  }, []);

//message:unautheticated handler
  axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
    if(err.response.status === 401){
       console.log(err.response.data.message);
      // setLoading(true);
      swal('hi bro',err.response.data.message,"Warning");
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
       
        
        {/* <Route path="/login" element={<Login/>} /> 
        <Route path="/register" element={<Register/>} />  */}

        {/* <Route exact  path="/403" element={<Page403/>}/>
        <Route exact  path="/403" element={<Page404/>}/>*/}
        

      <Route  exact path="/login" element=  {localStorage.getItem('auth_token')?<Navigate to="/" />:<Login/>} />
        
     
      <Route  exact path="/register" element= {localStorage.getItem('auth_token')?<Navigate to="/" />:<Register/>} />
         
    
      <Route path="/admin" element={<MasterLayout />} /> 
      <Route path='/admin/dashboard' element={<MasterLayout element={<Dashboard/>}/>}/>
     <Route  exact path='/admin/profile' element={<MasterLayout element={<Profile/>} />}/>  

     <Route  exact path='/admin/add-category' element={<MasterLayout element={<Category/>} />}/>  
     
     <Route  exact path='/admin/view-category' element={<MasterLayout element={<ViewCategory/>} />}/>

     <Route  exact path='/admin/edit-category/:id' element={<MasterLayout element={<EditCategory/>} />}/>  

     <Route  exact path='/admin/add-product' element={<MasterLayout element={<Product/>} />}/>  
     
     <Route  exact path='/admin/view-product' element={<MasterLayout element={<ViewProduct/>} />}/>

     <Route  exact path='/admin/edit-product/:id' element={<MasterLayout element={<EditProduct/>} />}/>  
 
      <Route  exact path="/admin" element={  Authenticated ?
                ( <MasterLayout   /> ) :
                ( <Navigate to="/login" />) }
                />
       


        <Route  exact path='/' element={<FrontendLayout element={<Home/>}/>} />   
        <Route exact  path="/about" element={<FrontendLayout element={<About/>}/>}/>
        <Route exact  path="/contact" element={<FrontendLayout element={<Contact/>}/>}/>
        
        <Route exact  path="/collection" element= {<FrontendLayout element={<ViewCategoryFrontend/>}/>}/>
        <Route exact  path="/collection/:slug" element={<FrontendLayout element={<ViewProductFrontend/>}/>}/>
        <Route exact  path="/collection/:category/:product" element={<FrontendLayout element={<ProductDetailsFrontend/>}/>}/>
        
        
        {/* {routes.map((e,idx)=>{
        return <Route exact path={e.path} element={e.element}/>
    })} */}
      </Routes>
    </Router>

    
    </div>
  );
}

export default App;
