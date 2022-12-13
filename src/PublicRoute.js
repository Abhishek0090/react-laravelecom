import React from 'react';
import {Route} from 'react-router-dom';
import FrontendLayout from './FrontendLayout';

function PublicRoute({...rest})
{
    return (
        <Route {...rest} element={ (props) => <FrontendLayout {...props} /> } />
    )
}

export default PublicRoute;