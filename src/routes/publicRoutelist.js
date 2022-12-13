import Home from '../components/frontend/Home';
import About from '../components/frontend/About';
import Contact from '../components/frontend/Contact';
import Page403 from '../components/errors/Page403';
import Page404 from '../components/errors/Page404';
import Register from '../components/frontend/auth/Register';
import Login from '../components/frontend/auth/Login';
import ViewCategoryFrontend from '../components/frontend/collections/ViewCategoryFrontend';
import ViewProductFrontend from '../components/frontend/collections/ViewProductFrontend';
 
const publicRoutesList = [
    { path: '/', exact: true, name: 'Home', element: Home },
    { path: '/about', exact: true, name: 'About', element: About },
    { path: '/contact', exact: true, name: 'Contact', element: Contact },
    { path: '/403', exact: true, name: 'Page403', element: Page403 },
    { path: '/404', exact: true, name: 'Page404', element: Page404 },
    { path: '/login', exact: true, name: 'Login', element: Login },
    { path: '/register', exact: true, name: 'Register', element: Register },
    { path: '/collection', exact: true, name: 'ViewCategoryFrontend', element: ViewCategoryFrontend },
    { path: '/collection/:slug', exact: true, name: 'ViewProductFrontend', element: ViewProductFrontend },
    
];

export default publicRoutesList;