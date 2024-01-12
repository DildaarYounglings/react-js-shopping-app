import React, { useEffect, useState } from 'react'
import { ShoppingCartStateGlobalContextData } from '../context/ShopingCartState'

export const ReadyToBuyItem = ({ item, handleDeleteThisItem }) => {
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
export const ClearCheckoutCartButton = ({ handleClearCheckoutCart, handleToggleIsCheckoutCartOpen, handleSearchCheckoutItems, searchTextState }) => {
  const setSearchText = searchTextState[1];
  return (
    <article style={{ display: "flex", gap: "1rem" }}>
      <button onClick={() => handleClearCheckoutCart()}>clear</button>
      <button style={{ color: "white", backgroundColor: "red" }} onClick={() => handleToggleIsCheckoutCartOpen()}>X</button>
      <input type="search" style={{ height: "1.5rem", width: "10.5rem" }} onChange={(e) => setSearchText(e.target.value)} />
    </article>
  )
}

export const CheckoutPage = () => {
  const { globalState, handleClearCheckoutCart, handleDeleteItemFromCheckoutCart, handleToggleIsCheckoutCartOpen, handleSearchCheckoutItems } = ShoppingCartStateGlobalContextData();
  const { isCheckoutCartOpen, allCheckoutProducts, allCheckoutProductsFiltered } = globalState;
  const [isAllCheckoutProductsFiltered, setIsAllCheckoutProductsFiltered] = useState(false);
  const [searchText, setSearchText] = useState("");
  const readyToBuyItems = allCheckoutProducts;
  useEffect(
    () => {
      if (searchText === "") {
        setIsAllCheckoutProductsFiltered(false)
      } else {
        handleSearchCheckoutItems(searchText);
        setIsAllCheckoutProductsFiltered(true);
        searchText("")
      }
    }, [searchText]
  );

  return (
    <div style={{ display: `${isCheckoutCartOpen ? "flex" : "none"}`, flexDirection: "column", width: "25%", gap: "1rem", padding: "0.1rem" }}>
      <div style={{ display: "flex", width: "25%", padding: "1rem", alignContent: "flex-end", alignItems: "flex-end" }}>
        <ClearCheckoutCartButton searchTextState={[searchText, setSearchText]} handleSearchCheckoutItems={handleSearchCheckoutItems} handleClearCheckoutCart={handleClearCheckoutCart} handleToggleIsCheckoutCartOpen={handleToggleIsCheckoutCartOpen} />
      </div>
      {isAllCheckoutProductsFiltered === true ?
        <React.Fragment>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {allCheckoutProducts && allCheckoutProducts.map((allCheckoutProduct, index) => <ReadyToBuyItem key={index} item={allCheckoutProduct} handleDeleteThisItem={handleDeleteItemFromCheckoutCart} />)}
          </div>
        </React.Fragment>
        :
        <React.Fragment>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {allCheckoutProductsFiltered && allCheckoutProductsFiltered.map((allCheckoutProduct, index) => <ReadyToBuyItem key={index} item={allCheckoutProduct} handleDeleteThisItem={handleDeleteItemFromCheckoutCart} />)}
          </div>
        </React.Fragment>
      }
    </div>
  )
}
