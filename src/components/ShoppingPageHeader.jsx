import React from 'react'
import { CheckoutPage } from './CheckoutPage';
import { ShoppingCartStateGlobalContextData } from '../context/ShopingCartState';

export const ShoppingPageHeader = () => {
  const {globalState,handleToggleIsCheckoutCartOpen} = ShoppingCartStateGlobalContextData();
  const isCheckoutCartOpen = globalState.isCheckoutCartOpen;
  return (
    <div className="ShoppingPageHeader">
      <nav className="ShoppingPageHeaderNav">
        <li className="ShoppingPageHeaderNavButton"><article style={{color:"white"}}>Home</article></li>
        <li className="ShoppingPageHeaderNavButton"><article style={{color:"white"}}>Products</article></li>
        <li className="ShoppingPageHeaderNavButton" onClick={() => handleToggleIsCheckoutCartOpen()}><article style={{color:"white"}}>Checkout</article></li>
      </nav>
      <ol className={`${isCheckoutCartOpen?"checkoutCartOpen":"checkoutCartClose"}`}>
        {isCheckoutCartOpen? <CheckoutPage/> : <CheckoutPage/>}
      </ol>
    </div>
  )
}
