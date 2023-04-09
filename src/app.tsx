import React from 'react';
import { renderRoutes } from 'react-router-config'
import routeConfig from '@/pages/router';
import { Link } from 'react-router-dom';
export default () => {
    return <div>
        <p>welcome to react ssr</p>
        <Link to='/home' style={{paddingRight: 100}}>Home</Link>
        <Link to='about'>About</Link>
        {renderRoutes(routeConfig)}
    </div>
}