import React from 'react'
import { ShoppingCartStateGlobalContextData } from '../context/ShopingCartState'

export const ReadyToBuyItem = ({ item,handleDeleteThisItem}) => {
    if (!item) {
      console.log(item)
      return <div>nothing is appearing</div>
    }
    return (
      <div className="ReadyToBuyItem">
        <button onClick={() => handleDeleteThisItem(item)}>Remove</button>
        <p>productName: {item.productName},</p><p>productCategory:{item.productCategory},</p><p>price:{item.price}</p>
      </div>
    )
}
export const ClearCheckoutCartButton = ({handleClearCheckoutCart,handleToggleIsCheckoutCartOpen}) => {
    return(
        <article style={{display:"flex",gap:"1rem"}}>
            <button onClick={() => handleClearCheckoutCart()}>clear</button>
            <button style={{color:"white",backgroundColor:"red"}} onClick={() => handleToggleIsCheckoutCartOpen()}>X</button>
        </article>
    )
}

export const CheckoutPage = () => {
  const {globalState,handleClearCheckoutCart,handleDeleteItemFromCheckoutCart,handleToggleIsCheckoutCartOpen} = ShoppingCartStateGlobalContextData();
  const {isCheckoutCartOpen, allCheckoutProducts} = globalState
  const readyToBuyItems = allCheckoutProducts;

  return (
    <div style={{display:`${isCheckoutCartOpen?"flex":"none"}`,flexDirection:"column",width:"25%",gap:"1rem",padding:"0.1rem"}}>
        <div style={{display:"flex",width:"25%",padding:"1rem",alignContent:"flex-end",alignItems:"flex-end"}}>
            <ClearCheckoutCartButton handleClearCheckoutCart={handleClearCheckoutCart} handleToggleIsCheckoutCartOpen={handleToggleIsCheckoutCartOpen}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            {allCheckoutProducts && allCheckoutProducts.map((allCheckoutProduct,index) => <ReadyToBuyItem key={index} item={allCheckoutProduct} handleDeleteThisItem={handleDeleteItemFromCheckoutCart}/>)}
        </div>
    </div>
  )
}
