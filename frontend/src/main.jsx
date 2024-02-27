import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import {Route, RouterProvider, createRoutesFromElements} from "react-router";
import App from './App.jsx'
import store from './redux/store.js';
import {Provider} from "react-redux";
import Register from './pages/Auth/Registration.jsx';
import Login from './pages/Auth/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from './pages/User/Profile.jsx';
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import UserList from './pages/Admin/UserList.jsx';

import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      {/* registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
      </Route>

      {/* Admin route */}
      <Route path='/admin' element={<AdminRoute />}>
        <Route path='categorylist' element={<CategoryList />} />
        <Route path='userlist' element={<UserList />} />
      </Route>
      
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
)
