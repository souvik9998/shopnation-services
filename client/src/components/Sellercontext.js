import React,{useContext, useState} from 'react'

const SellerContext = React.createContext();

const SellerProvider = ({children}) =>{
    const[savedProduct,setSavedProduct] = useState([])

    return <SellerContext.Provider value={{savedProduct,setSavedProduct}}>{children}</SellerContext.Provider>
}

const useSellerContext = () =>{
    return useContext(SellerContext);
}

export {useSellerContext,SellerProvider};
