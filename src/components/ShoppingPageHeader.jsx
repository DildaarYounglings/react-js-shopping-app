import React from 'react'
import { CheckoutPage } from './CheckoutPage';
import { ShoppingCartStateGlobalContextData } from '../context/ShopingCartState';

export const ShoppingPageHeader = () => {
  const {globalState,handleToggleIsCheckoutCartOpen} = ShoppingCartStateGlobalContextData();
  const isCheckoutCartOpen = globalState.isCheckoutCartOpen;
  const isCheckoutCartOpenAnimationTriggered = globalState.isCheckoutCartOpenAnimationTriggered;
  return (
    <div style={{display:"flex",position:"fixed",top:"0px",left:"0px",padding:"1rem",height:"fit-content",width:"99vw", outline:"1px solid black"}}>
      <ol style={{display:"flex",flexFlow:"row",listStyleType:"none",gap:"1rem"}}>
        <li style={{outline:"1px solid black",padding:"1rem 3rem",borderRadius:"1.5rem",cursor:"pointer"}}><article>Home</article></li>
        <li style={{outline:"1px solid black",padding:"1rem 3rem",borderRadius:"1.5rem",cursor:"pointer"}}><article>Products</article></li>
        <li style={{outline:"1px solid black",padding:"1rem 3rem",borderRadius:"1.5rem",cursor:"pointer"}} onClick={() => handleToggleIsCheckoutCartOpen()}><article>Checkout</article></li>
      </ol>
      <ol className={`${isCheckoutCartOpen === true && isCheckoutCartOpenAnimationTriggered === true?"checkoutCartOpen":"checkoutCartClose"}`}>
        {isCheckoutCartOpen === true||isCheckoutCartOpenAnimationTriggered === true &&<CheckoutPage/>}
      </ol>
    </div>
  )
}
