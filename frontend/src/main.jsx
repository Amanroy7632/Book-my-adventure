import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout'
import './index.css'
import { Route, RouterProvider,createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import Home from './component/home/Home'
import {SelectBus} from "./component/index.js"
import Login from './component/Auth/Login.jsx'
import Signup from './component/Auth/Signup.jsx'
import { UserProvider } from './context/userContext.jsx'
import PublicRoute from './component/secureRoute/PublicRoute.jsx'
import ProtectedRoute from './component/secureRoute/ProtectedRoute.jsx'
import Profile from './component/profile/Profile.jsx'
const router =createBrowserRouter(
  createRoutesFromChildren(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/login' element={<PublicRoute element={<Login/>} />}/>
      <Route path='/register' element={<PublicRoute element={<Signup/>}/>}/>
      <Route path='/profile' element={<ProtectedRoute element={<Profile/>} />}/>
      <Route path='/select-bus' element={<SelectBus/>}/>
      <Route path='*' element={<div className=' text-3xl text-red-500'>404 Page not found</div>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
   <UserProvider>
    <RouterProvider router={router} />
   </UserProvider>
    
    
)
