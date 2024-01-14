import './App.css';
import Home from './pages/Home';
// import Register from  './components/Register';
import Login from './pages/Login';
import {Routes, Route,BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout';
import Storesearch from './pages/Storesearch';
// import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import Shopproductpage from './pages/Shopproductpage';
import Checkoutsuccess from './pages/Checkoutsuccess';
import Usercart from './pages/Usercart';
import Checkoutlayout from './pages/Chekout/Layout';
import Checkout from './pages/Chekout/Checkout';
import Addresspage from './pages/Chekout/Addresspage';
import Paymentpage from './pages/Chekout/Paymentpage'
import Deliverypage from './pages/Chekout/Deliverypage'
import Reviewpage from './pages/Chekout/Reviewpage';
import Roleselect from './pages/Roleselect';
import Seller from './pages/sellerSignup/Seller';
import Buyer from './pages/buyerSignup/Buyer';
import Loginrole from './pages/Loginrole';
import Loginpage from './pages/Loginpage';
import Sellerloginpage from './pages/Sellerloginpage';
import Sellerhome from './pages/SellerPages/Sellerhome';
import Productmanagement from './pages/SellerPages/Productmanagement';
import Sellerlayout from './components/SellerComponents/Sellerlayout';
import Ordermanagementpage from './pages/SellerPages/Ordermanagementpage';
import Editproduct from './pages/SellerPages/Editproduct';
import Productdetails from './pages/SellerPages/Productdetails';
import Addproduct from './pages/SellerPages/Addproduct';
import Editorder from './pages/SellerPages/Editorder';
import Sellerprofile from './pages/SellerPages/Sellerprofile';
import Overview from './pages/SellerPages/Overview';
import Addproductinfo from './pages/SellerPages/Addproductinfo';
import Addproductlayout from './pages/SellerPages/Addproductlayout';
import Animation from './pages/Animation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Notfound from './pages/Notfound';
import { useGlobalContext } from './components/context';
import ProfileLayout from './pages/User/Profile/ProfileLayout';
import PersonalInfo from './pages/User/Profile/PersonalInfo';
import OrderLayout from './pages/OrderPage/OrderLayout';
import Orderdetails from './pages/OrderPage/Orderdetails';
import Cancelledorder from './pages/OrderPage/Cancelledorder';
import Successfulorder from './pages/OrderPage/Successfulorder';
import Forgotpassword from './pages/Forgotpassword';
import Otpverify from './pages/Otpverify';
import Resetpassword from './pages/Resetpassword';
import ProductInfopage from './pages/ProductInfopage';
import MobileSearch from './pages/MobileSearch';
import MobileProductInfo from './pages/MobileProductInfo';
import { useMediaQuery } from 'react-responsive';
import MobilePersonalInfo from './pages/User/Profile/MobilePersonalInfo';
import { StoreProvider } from './context/StoreContext';
// import UserCart from './pages/UserCart';
function App() {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const isComputer = useMediaQuery({ minWidth: 1024});
  return (
    <>
    <BrowserRouter>
        <Routes>
          
          <Route path = '/' element = {<Layout/>}>
            <Route path= '/' index element = {<Home/>} />
            <Route path ="/ShopProductPage/:shopId" 
            element={<StoreProvider>
              <Shopproductpage/>
            </StoreProvider>}/>
            {isComputer&&
            <Route path="/ShopProductPage/:shopId/:productId" 
            element={<StoreProvider>
              <ProductInfopage/>
              </StoreProvider>} />
            }
            {isComputer&&
            <Route path="/ShopProductPage/:shopId/:productId/:variantId" 
            element={<StoreProvider>
              <ProductInfopage/>
            </StoreProvider>} />}
            {isMobile &&
            <Route path="/ShopProductPage/:shopId/:productId" 
            element={<StoreProvider>
              <MobileProductInfo/>
              </StoreProvider>} />}
            {isMobile&&
            <Route path="/ShopProductPage/:shopId/:productId/:variantId" 
            element={<StoreProvider>
              <MobileProductInfo/>
            </StoreProvider>} />}
            <Route path='/Storesearch' element={<Storesearch/>} />
            <Route path='/checkout-success' element={<Checkoutsuccess />} />
            <Route path='/user-profile' element={<ProfileLayout/>}>
              {isComputer&& <Route path='/user-profile' element={<PersonalInfo/>}/>}
              {isMobile  && <Route path='/user-profile' element={<MobilePersonalInfo/>}/>}
            </Route>
            <Route path='/user-cart/:userId' element={<Usercart/>} />
            <Route path='/user-cart/*' element={<Usercart/>} />
            
            
            <Route path='/order-page' element={<OrderLayout/>}>
              <Route path='/order-page' element={<Orderdetails/>}/>
              <Route path='/order-page/cancelled-order' element={<Cancelledorder/>}/>
              <Route path='/order-page/successful-order' element={<Successfulorder/>} />
            </Route>
          </Route>
          <Route path='/mobile-search' element={<MobileSearch />} />
          {/* <Route path='/ShopProductPage/mobileProductPage/:shopId/:productId' element={<MobileProductInfo />} />
          <Route path='/ShopProductPage/mobileProductPage/:shopId/:productId/:variantId' element={<MobileProductInfo />} /> */}
          <Route path='/checkout' element={<Checkoutlayout />}>
              <Route path = '/checkout' index element = {<Addresspage/>} />
              <Route path = '/checkout/paymentpage' element = {<Paymentpage/>} />
              <Route path = '/checkout/reviewpage' element = {<Reviewpage/>} />
          </Route>
          <Route path='/Roleselect' element={<Roleselect />}/>
          <Route path ="/buyer-signup" element={<Buyer />}/>
          <Route path='/seller-signup' element={<Seller />} />
          <Route path = '/loginpage' element = {<Loginpage/>}>
            <Route path='/loginpage' element={<Login />} />
            <Route path='/loginpage/forgot-password' element={<Forgotpassword />} />
            <Route path='/loginpage/otp-verify' element={<Otpverify />} />
            <Route path='/loginpage/reset-password' element={<Resetpassword />} />
          </Route>
          <Route path='/seller-loginpage' element ={<Sellerloginpage />} />
          <Route path='/Loginrole' element = {<Loginrole />} />

          <Route path='/seller' element={<Sellerlayout/>}>
            <Route path='/seller' element={<Sellerhome/>}/>
            <Route path='/seller/seller-profile' element={<Sellerprofile/>} />
            <Route path='/seller/productmanagement-page/product-details' element={<Productmanagement/>} />
            <Route path='/seller/productmanagement-page/edit-products' element={<Editproduct/>} />
            <Route path='/seller/productmanagement-page/add-products' element={<Addproductlayout/>}>
              <Route path='/seller/productmanagement-page/add-products' element={<Addproductinfo />}/>
              <Route path='/seller/productmanagement-page/add-products/overview' element={<Overview />}/>
            </Route>
            <Route path='/seller/ordermanagement-page/order-details' element={<Ordermanagementpage/>} />
            <Route path='/seller/ordermanagement-page/edit-orders' element={<Editorder/>} />
            
          </Route>
          <Route path='/animation-test' element={<Animation/>} />
          <Route path='*' element={<Notfound/>}/>
          
        </Routes>
          
      </BrowserRouter>
    </>
  );
}

export default App;
