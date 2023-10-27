import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './components/context';
import { SellerProvider } from './components/Sellercontext';
import env from 'react-dotenv';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <SellerProvider>
      <App />
      <ToastContainer />
    </SellerProvider>
  </AppProvider>
);

