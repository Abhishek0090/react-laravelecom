import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';


const routes = [
{path : '/admin' ,  exact : true , name : 'Admin'},
{path : '/dashboard' ,  exact : true , name : 'Dashboard',  component : Dashboard},
{path : '/profile' ,  exact : true , name : 'Profile' , component : Profile}
];


export default routes;