import React from 'react'
import { ShoppingCartStateGlobalContextData } from '../context/ShopingCartState'

export const ReadyToBuyItem = ({ item,handleDeleteThisItem}) => {
    if (!item) {
      console.log(item)
      return <div>nothing is appearing</div>
    }
    return (
      <div>
        <button onClick={() => handleDeleteThisItem(item)}>Remove</button>
        <p>productName: {item.productName},</p><p>productCategory:{item.productCategory},</p><p>price:{item.price}</p>
      </div>
    )
}
export const ClearCheckoutCartButton = ({handleClearCheckoutCart,handleToggleIsCheckoutCartOpen}) => {
    return(
        <article style={{display:"flex",gap:"1rem"}}>
            <button onClick={() => handleClearCheckoutCart()}>clear</button>
            <button onClick={() => handleToggleIsCheckoutCartOpen()}>X</button>
        </article>
    )
}

export const CheckoutPage = () => {
  const {globalState,handleClearCheckoutCart,handleDeleteItemFromCheckoutCart,handleToggleIsCheckoutCartOpen} = ShoppingCartStateGlobalContextData();
  const readyToBuyItems = globalState.allCheckoutProducts;
  return (
    <div style={{display:"flex",flexDirection:"column",width:"25%",gap:"1rem",padding:"0.1rem"}}>
        <div style={{display:"flex",width:"25%",padding:"1rem",alignContent:"flex-end",alignItems:"flex-end"}}>
            <ClearCheckoutCartButton handleToggleIsCheckoutCartOpen={handleToggleIsCheckoutCartOpen} handleClearCheckoutCart={handleClearCheckoutCart}/>
        </div>
        <div>
            {readyToBuyItems && readyToBuyItems.map((readyToBuyItem,index) => <ReadyToBuyItem key={index} item={readyToBuyItem} handleDeleteThisItem={handleDeleteItemFromCheckoutCart}/>)}
        </div>
    </div>
  )
}
