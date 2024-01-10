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
export const ClearCheckoutCartButton = ({handleClearCheckoutCart}) => {
    return(
        <div>
            <button onClick={() => handleClearCheckoutCart()}>clear</button>
        </div>
    )
}

export const CheckoutPage = () => {
  const {globalState,handleClearCheckoutCart,handleCheckIfCartHasTheSameItem,handleDeleteItemFromCheckoutCart} = ShoppingCartStateGlobalContextData();
  const readyToBuyItems = globalState.allCheckoutProducts;
  return (
    <div style={{display:"flex",width:"100%",padding:"1rem"}}>
        <div>
            <ClearCheckoutCartButton/>
        </div>
        <div>
            {readyToBuyItems && readyToBuyItems.map((readyToBuyItem,index) => <ReadyToBuyItem key={index} item={readyToBuyItem} handleDeleteThisItem={handleDeleteItemFromCheckoutCart}/>)}
        </div>
    </div>
  )
}
