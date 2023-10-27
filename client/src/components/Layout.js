import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Header from './Navbar/Navbar';
import Footer from './Footer';
import { useGlobalContext } from './context';
import Loadinscreen from '../pages/Loadinscreen';
import IntroImage from '../Images/IntroImage.png'
const Layout = () => {
  const {isLoading} = useGlobalContext();
  if(isLoading){
    return(
      <Loadinscreen />
    )
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  )
}

export default Layout
