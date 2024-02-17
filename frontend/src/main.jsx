import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import {Route, RouterProvider, createRoutesFromElements} from "react-router";
import App from './App.jsx'
import store from './redux/store.js';
import {Provider} from "react-redux";
import Register from './pages/Auth/Registration.jsx';
import Login from './pages/Auth/Login.jsx';

import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
  </Provider>
)
