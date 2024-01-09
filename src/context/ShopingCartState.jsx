import React, { useContext, useState } from 'react'
// <> //
// Initial State //
const initialState = {
    allShopProducts: [
        { productName: "banana", productCategory: "fruit", price: 10 },
        { productName: "apple", productCategory: "fruit", price: 5 },
    ],
    allCheckoutProducts: []
}
const ShoppingCartStateGlobalContext = React.createContext()
// </> //


// <> //
// Global State //
export const ShoppingCartStateGlobalContextData = () => useContext(ShoppingCartStateGlobalContext);
// </> //


// <> //
// Provider component //
export const ShopingCartStateProvider = ({children}) => {
    const [globalState, setGlobalState] = useState(initialState);
    const handleCheckIfCartHasTheSameItem = (product) => {
        const allItemsToCheck = globalState.allCheckoutProducts.map((item) => item.productName);
        let result = allItemsToCheck.includes(product.productName);
        return result;
      }
      const handleAddToCheckoutCart = (product) => {
        if (handleCheckIfCartHasTheSameItem(product) === false) {
          const {allCheckoutProducts} = globalState;
          let copy = [...allCheckoutProducts,product];
          setGlobalState({...globalState,allCheckoutProducts:copy});
        }
        console.log(readyToBuy);
      }
      const handleClearCheckoutCart = () => {
        const {allCheckoutProducts} = globalState;
        let emptyArray = [] ;
        setGlobalState({...globalState,allCheckoutProducts:emptyArray});
      }
      const handleDeleteItemFromCheckoutCart = (product) => {
        const {allCheckoutProducts} = globalState;
        let mySet = new Set([...allCheckoutProducts]);
        let isItemDeleted = mySet.delete(product);
        if(isItemDeleted !== true)return;
        let copy = [...mySet];setGlobalState({...globalState,allCheckoutProducts:copy});
      }
    return (
        <ShoppingCartStateGlobalContext.Provider value={{globalState,handleAddToCheckoutCart,handleClearCheckoutCart,handleCheckIfCartHasTheSameItem,handleDeleteItemFromCheckoutCart}}>
            {children}
        </ShoppingCartStateGlobalContext.Provider>
    )
}
// </> //