import React, { useContext, useState } from "react";
// <> //
// Initial State //
const initialState = {
  allShopProducts: [
    {
      productName: "banana",
      productCategory: "fruit",
      price: 10,
      quantity: 12,
      Comments: [
        { username: "dildaar", content: "they have great quality bananas" },
      ],
    },
    {
      productName: "apple",
      productCategory: "fruit",
      price: 5,
      quantity: 12,
      Comments: [
        { username: "dildaar", content: "they have great quality apples" },
      ],
    },
  ],
  allCheckoutProducts: [],
  isCheckoutCartOpen:true,
  isCheckoutCartOpenAnimationTriggered:true,
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

  const handleCheckIfCartHasTheSameItem = (product) => {
    const allItemsToCheck = globalState.allCheckoutProducts.map(
      (item) => item.productName
    );
    let result = allItemsToCheck.includes(product.productName);
    return result;
  };
  const handleAddToCheckoutCart = (product) => {
    if (handleCheckIfCartHasTheSameItem(product) === true)return;
    const { allCheckoutProducts } = globalState;
    let copy = [...allCheckoutProducts, product];
    setGlobalState({ ...globalState, allCheckoutProducts: copy });
  };
  const handleClearCheckoutCart = () => {
    if (
      window.confirm(
        "are you sure you wish to proceed to clear your carts items"
      ) === false
    )
      return;
    const { allCheckoutProducts } = globalState;
    let emptyArray = [];
    setGlobalState({ ...globalState, allCheckoutProducts: emptyArray });
  };
  const handleDeleteItemFromCheckoutCart = (product) => {
    const { allCheckoutProducts } = globalState;
    let mySet = new Set([...allCheckoutProducts]);
    if (!product) return;
    let isItemDeleted = mySet.delete(product);
    if (isItemDeleted === false) return;
    let copy = [...mySet];
    setGlobalState({ ...globalState, allCheckoutProducts: copy });
  };
  const handleToggleIsCheckoutCartOpen = () => {
    const {isCheckoutCartOpen,isCheckoutCartOpenAnimationTriggered} = globalState;
    switch(isCheckoutCartOpen){
      case true:
        setGlobalState({...globalState,isCheckoutCartOpenAnimationTriggered:false});
        setTimeout(() => {setGlobalState({...globalState,isCheckoutCartOpen:false})},2500);
        break;
      case false:
        setGlobalState({...globalState,isCheckoutCartOpen:true,});
        setGlobalState({...globalState,isCheckoutCartOpenAnimationTriggered:true});
        break;
    }
  }
  
  
  
  return (
    <ShoppingCartStateGlobalContext.Provider
      value={{
        globalState,
        handleAddToCheckoutCart,
        handleClearCheckoutCart,
        handleCheckIfCartHasTheSameItem,
        handleDeleteItemFromCheckoutCart,
        handleToggleIsCheckoutCartOpen,
      }}
    >
      {children}
    </ShoppingCartStateGlobalContext.Provider>
  );
};
// </> //
