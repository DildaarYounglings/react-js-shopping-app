import React, { useState } from "react";
import { ShoppingCartStateGlobalContextData } from "../context/ShopingCartState";
import { ShoppingPageHeader } from "./ShoppingPageHeader";
import { ShoppingPageFooter } from "./ShoppingPageFooter";

export const ShoppingCartItem = ({item,addToCart}) => {
  return (
    <div>
      <p>productName: {item.productName},</p>productCategory:{item.productCategory},<p></p><p>price:{item.price}</p>
      <button onClick={() => addToCart(item)}>Add</button>
    </div>
  )
}
export const ReadyToBuyItem = ({ item }) => {
  if (!item) {
    console.log(item)
    return <div>nothing is appearing</div>
  }
  return (
    <div>
      <p>productName: {item.productName},</p><p>productCategory:{item.productCategory},</p><p>price:{item.price}</p>
    </div>
  )
}

export const ShoppingPage = () => {
  const {globalState,handleAddToCheckoutCart,handleClearCheckoutCart,handleCheckIfCartHasTheSameItem,handleDeleteItemFromCheckoutCart} = ShoppingCartStateGlobalContextData();
  const shoppingCartItems = globalState.allShopProducts;
  const readyToBuyItems = globalState.allCheckoutProducts;
  return (
    <>
    <ShoppingPageHeader/>
    <div style={{ position: "absolute",left:"0px", display: "flex", flexDirection: "column",overflowY:"scroll",height:"fit-content",width:"100%",padding:"1rem",gap:"1rem"}}>
      {shoppingCartItems.map((object, index) => (
        <ShoppingCartItem key={index} item={object} addToCart={handleAddToCheckoutCart}/>
      ))}
      {readyToBuyItems && readyToBuyItems.map((object, index) => (
        <ReadyToBuyItem key={index} item={object} />
      ))}

      <ShoppingPageFooter/>
    </div>
    </>
  );
};