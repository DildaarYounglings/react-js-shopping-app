import React, { useContext, useRef, useState } from "react";
// <> //
// Initial State //
const initialState = {
  allShopProducts: [
  ],
  allCheckoutProducts: [],
  isAllCheckoutProductsFiltered: false,
  searchText: "",
  allCheckoutProductsFiltered: [],
  isCheckoutCartOpen: false,
  allCheckoutProductsPrice:0,
};
const ShoppingCartStateGlobalContext = React.createContext();
// </> //

// <> //
// Global State //
export const ShoppingCartStateGlobalContextData = () =>
  useContext(ShoppingCartStateGlobalContext);
// </> //

// <> //
// Provider component //
export const ShopingCartStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(initialState);
  const setSearchText = (text) => {
    setGlobalState((g) => ({ ...g, searchText: text }));
  };
  const handlSetAllShopProducts = (allShopProducts) => {
    setGlobalState((g) => ({...g,allShopProducts:[...allShopProducts]}));
  }
  const handleCheckIfCartHasTheSameItem = (product) => {
    const allItemsToCheck = globalState.allCheckoutProducts.map(
      (item) => item.productName
    );
    let result = allItemsToCheck.includes(product.productName);
    return result;
  };
  const handleAddToCheckoutCart = (product) => {
    if (handleCheckIfCartHasTheSameItem(product) === true) return;
    const { allCheckoutProducts } = globalState;
    let copy = [...allCheckoutProducts, product];
    setGlobalState((g) => ({ ...g, allCheckoutProducts: copy }));
  };

  const handleClearCheckoutCart = () => {
    if (
      window.confirm(
        "are you sure you wish to proceed to clear your carts items"
      ) === false
    )
      return;
    let emptyArray = [];
    setGlobalState((g) => ({ ...g, allCheckoutProducts: emptyArray }));
  };
  const handleDeleteItemFromCheckoutCart = (product) => {
    const { allCheckoutProducts } = globalState;
    let mySet = new Set([...allCheckoutProducts]);
    if (!product) return;
    let isItemDeleted = mySet.delete(product);
    if (isItemDeleted === false) return;
    let copy = [...mySet];
    setGlobalState((g) => ({ ...g, allCheckoutProducts: copy }));
  };
  const handleToggleIsCheckoutCartOpen = () => {
    const { isCheckoutCartOpen } = globalState;
    setGlobalState((g) => ({ ...g, isCheckoutCartOpen: !isCheckoutCartOpen }));
  };
  const handleIncrementProductQuantity = function (product, number) {
    let allCheckoutProducts = [...globalState.allCheckoutProducts];
    if (!product && !number) return;
    const allCheckoutProductsCopy = allCheckoutProducts;
    const allCheckoutProductsCopy1 = allCheckoutProductsCopy.map((value) => {
      if(value.productName === product.productName){
        return({...value,quantity:value.quantity + number});
      }else{
        return value;
      }
    })
    setGlobalState((g) => ({
      ...g,
      allCheckoutProducts:allCheckoutProductsCopy1,
    }));
  };
  const handleDecrementProductQuantity = function (product, number) {
    let allCheckoutProducts = [...globalState.allCheckoutProducts];
    if (!product && !number) return;
    const allCheckoutProductsCopy = allCheckoutProducts;
    const allCheckoutProductsCopy1 = allCheckoutProductsCopy.map((value) => {
      if(value.productName === product.productName){
        return({...value,quantity:value.quantity - number});
      }else{
        return value;
      }
    })
    setGlobalState((g) => ({
      ...g,
      allCheckoutProducts:allCheckoutProductsCopy1,
    }));
  }
  const handleCalculatePrice = function() {
    const allCheckoutProducts = [...globalState.allCheckoutProducts];
    if(allCheckoutProducts.length <= 0){
      setGlobalState((g) => ({...g,allCheckoutProductsPrice:0}));
      return;
    }
    const allCheckoutProductsPricesArray = allCheckoutProducts.map((value) => value.price * value.quantity);
    const allCheckoutProductsPricesAdded = allCheckoutProductsPricesArray.reduce((p,c) => {return p + c},0);
    setGlobalState((g) => ({...g,allCheckoutProductsPrice:allCheckoutProductsPricesAdded}));
  }
  return (
    <ShoppingCartStateGlobalContext.Provider
      value={{
        globalState,
        handlSetAllShopProducts,
        handleCalculatePrice,
        handleIncrementProductQuantity,
        handleDecrementProductQuantity,
        handleAddToCheckoutCart,
        handleClearCheckoutCart,
        handleCheckIfCartHasTheSameItem,
        handleDeleteItemFromCheckoutCart,
        handleToggleIsCheckoutCartOpen,
        setSearchText,
        setGlobalState,
      }}
    >
      {children}
    </ShoppingCartStateGlobalContext.Provider>
  );
};
// </> //
