import React from 'react'
import store from '../Images/store.png';
import { Link } from 'react-router-dom';

const Searchstorecard = (props) => {
  return (
    <>
      <div className="bg-cardColor p-2 overflow-hidden rounded-lg shadow-lg text-center">
      <img className="w-11/12 h-fit mx-auto" src={store} alt="Product Image" />
      <div className="p-4">
        <h3 className="text-gray-900 font-medium text-lg">{props.storeName}</h3>
        <p className="text-gray-700 mt-2">Hardware shop</p>
        <div className="mt-4">
          <Link to={`/ShopProductPage/${props.shopId}`}><button className="bg-buttonColor hover:bg-textcolor text-white font-bold py-2 px-4 rounded">Visit the store</button></Link>
        </div>
      </div>
      </div>
    </>
  )
}

export default Searchstorecard
