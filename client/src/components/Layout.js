import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Header from './Navbar/Navbar';
import Footer from './Footer';
import { useGlobalContext } from './context';
import Loadinscreen from '../pages/Loadinscreen';
import IntroImage from '../Images/IntroImage.png'
import { useParams } from 'react-router-dom';
const Layout = () => {
  const {isLoading} = useGlobalContext();
  const location = useLocation();
  const { shopId, productId, variantId } = useParams();
  return (
    <>
    {
      
    window.innerWidth < 1024 &&
    (location.pathname === `/ShopProductPage/${shopId}/${productId}` ||
    location.pathname === `/ShopProductPage/${shopId}/${productId}/${variantId}`
    
    )
    ? ''
    : <Header />
    }
      
      <Outlet />
      <Footer/>
    </>
  )
}

export default Layout
