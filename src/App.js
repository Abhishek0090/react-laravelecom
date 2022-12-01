 
import { Route, BrowserRouter as Router, Switch, Routes   } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import MasterLayout from './layouts/admin/MasterLayout';

function App() {
  return (
    <div className="App">
    <Router>

    <Routes>
          <Route   index  path="/admin" name="Admin" render={(props)=><MasterLayout {...props}/>}  />
{/*           
          <Route exact path="/admin/dashboard"  element={<Dashboard/>}/>

          <Route exact path="/admin/profile"  element={<Profile/>}/> */}
  
      </Routes>
    </Router>
    </div>
  );
}

export default App;
