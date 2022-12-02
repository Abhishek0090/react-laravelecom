 
import { Route, BrowserRouter as Router, Switch, Routes   } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Home from './components/frontend/Home';
import MasterLayout from './layouts/admin/MasterLayout';

function App() {
  return (
    <div className="App">
    <Router>

    <Routes>
          {/* <Route   path="/admin" name="Admin" render={(props)=><MasterLayout {...props}/>}  /> */}
{/* {/*            */}
          {/* <Route exact path="/admin/dashboard"  element={<Dashboard/>}/>

          <Route exact path="/admin/profile"  element={<Profile/>}/>  */}
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login/>} /> 
        <Route path="/register" element={<Register/>} /> 

        <Route path="/admin" element={<MasterLayout />} /> 
        <Route path='/admin/dashboard' element={<MasterLayout element={<Dashboard/>}/>}/>
        <Route path='/admin/profile' element={<MasterLayout element={<Profile/>} />}/>  
      </Routes>
    </Router>
    </div>
  );
}

export default App;
