import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

// layout
import Main from '../layout/Main';

// pages
import Login from '../pages/login';
const Home = lazy(() => import('../pages/home'));

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    exact: true,
    render: () => <Redirect to='/home' />,
  },
  {
    path: '/',
    component: Main,
    routes: [
      {
        path: '/home',
        component: Home
      },
    ]
  },
]

export default routes;
