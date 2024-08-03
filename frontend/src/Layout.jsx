import React from 'react'
import Header from './component/header/Header'
import Footer from './component/footer/Footer'
import {Outlet} from "react-router-dom"
const Layout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
