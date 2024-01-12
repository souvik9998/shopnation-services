import React from "react";
import { useContext } from "react";
import { useState } from "react";

const StoreContext = React.createContext();
const StoreProvider = ({children})=>{
    const [shopInfo,setShopInfo] = useState('');
    const [productList,setProductList] = useState([]);
    const [currentShopId,setCurrentShopId] = useState('');
    return <StoreContext.Provider
    value={{shopInfo,setShopInfo,productList,setProductList,currentShopId,setCurrentShopId}}>
        {children}
    </StoreContext.Provider>
}
const useStoreContext = () =>{
    return useContext(StoreContext)
}
export {StoreContext,StoreProvider,useStoreContext}