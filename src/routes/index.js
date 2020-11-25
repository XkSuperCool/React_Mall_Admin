import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

// layout
import Main from '../layout/main';

// pages
import Login from '../pages/login';
import NotFound from '../pages/not_found';
const Home = lazy(() => import('../pages/home'));
const AccessList = lazy(() => import('../pages/access_list'));
const RoleList = lazy(() => import('../pages/role_list'));

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    exact: true,
    component: () => <Redirect to='/m' />,
  },
  {
    path: '/m',
    component: Main,
    routes: [
      {
        path: '/m',
        exact: true,
        auth: true,
        component: Home
      },
      {
        path: '/m/access/list',
        auth: true,
        component: AccessList
      },
      {
        path: '/m/role/list',
        auth: true,
        component: RoleList
      },
      {
        path: '*',
        render: () => <Redirect to='/not/fond' />,
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]


export default routes;
