import Home from '@/pages/Home';
import About from '@/pages/About';
import { RouteConfig } from 'react-router-config';

const routeConfig: Array<RouteConfig> = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/home',
        component: Home,
        exact: true,
    },
    {
        path: '/about',
        component: About,
        exact: true,
    }
]

export default routeConfig;