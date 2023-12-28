import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Header from './Navbar/Navbar';
import Footer from './Footer';
import { useGlobalContext } from './context';
import Loadinscreen from '../pages/Loadinscreen';
import IntroImage from '../Images/IntroImage.png'
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
const Layout = () => {
  const {isLoading} = useGlobalContext();
  const location = useLocation();
  const { shopId, productId, variantId } = useParams();
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const isComputer = useMediaQuery({ minWidth: 1024});
  const getLocation =()=>{
    return ((location.pathname === `/ShopProductPage/${shopId}/${productId}` ||
    location.pathname === `/ShopProductPage/${shopId}/${productId}/${variantId}`
    ||location.pathname === `/user-profile`
    )&& isMobile)
  }
  
  useEffect(()=>{
    const renderLocation = getLocation();
  },[])
  return (
    <>
    <Header />
      <Outlet />
      <Footer/>
    </>
  )
}

export default Layout
