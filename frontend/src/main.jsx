import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout'
import './index.css'
import { Route, RouterProvider,createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import Home from './component/home/Home'
import {SelectBus} from "./component/index.js"
const router =createBrowserRouter(
  createRoutesFromChildren(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/select-bus' element={<SelectBus/>}/>
      <Route path='*' element={<div className=' text-3xl text-red-500'>404 Page not found</div>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
  
    <RouterProvider router={router} />
  
)
