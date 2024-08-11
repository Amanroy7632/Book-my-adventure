import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import Layout from './Layout'
const Layout =React.lazy(()=>import( "./Layout.jsx"))
import './index.css'
import { Route, RouterProvider,createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
// import Home from './component/home/Home'
const Home = React.lazy(()=>import("./component/home/Home.jsx"))
import {SelectBus} from "./component/index.js"
import Login from './component/Auth/Login.jsx'
import Signup from './component/Auth/Signup.jsx'
import { UserProvider } from './context/userContext.jsx'
import PublicRoute from './component/secureRoute/PublicRoute.jsx'
import ProtectedRoute from './component/secureRoute/ProtectedRoute.jsx'
import Profile from './component/profile/Profile.jsx'
import LoadingAnimation from './component/home/Animation/LandingPageAnimation.jsx'
import { MouseTrackerProvider } from './context/mouseTrackerContext.jsx'
import Sparkles from './component/home/Animation/Sparkle.jsx'
import { BusContextProvider } from './context/busContext.jsx'
import TicketReceiptPage from './component/selectbus-page/right/bus-book/bill/TicketRecipt.jsx'

const router =createBrowserRouter(
  createRoutesFromChildren(
    <Route path='/' element={<Suspense fallback={<LoadingAnimation/>}>
      <Layout/>
    </Suspense>}>
      <Route path='' element={<Suspense fallback={<LoadingAnimation/>}>
      <Home/>
    </Suspense>}/>
      <Route path='/login' element={<PublicRoute element={<Login/>} />}/>
      <Route path='/register' element={<PublicRoute element={<Signup/>}/>}/>
      <Route path='/profile' element={<ProtectedRoute element={<Profile/>} />}/>
      <Route path='/select-bus' element={<SelectBus/>}/>
      <Route path='/a' element={<LoadingAnimation/>}/>
      <Route path='/receipt' element={<TicketReceiptPage/>}/>
      <Route path='*' element={<div className=' text-3xl text-red-500'>404 Page not found</div>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
   <UserProvider>
    <MouseTrackerProvider>
      <BusContextProvider>
    <RouterProvider router={router} />
    </BusContextProvider>
    </MouseTrackerProvider>
   </UserProvider>
    
    
)
