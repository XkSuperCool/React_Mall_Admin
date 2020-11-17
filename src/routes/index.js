import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

// layout
import Main from '../layout/main';

// pages
import Login from '../pages/login';
const Home = lazy(() => import('../pages/home'));
const AccessList = lazy(() => import('../pages/access_list'));

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
      {
        path: '/access/list',
        component: AccessList
      }
    ]
  },
]

export default routes;
