import React, { useEffect, useState } from "react";
import { ShoppingCartStateGlobalContextData } from "../context/ShopingCartState";

export const ReadyToBuyItem = ({ item, handleDeleteThisItem }) => {
  if (!item) {
    console.log(item);
    return <div>nothing is appearing</div>;
  }
  return (
    <div className="ReadyToBuyItem">
      <button onClick={() => handleDeleteThisItem(item)}>Remove</button>
      <p>productName: {item.productName},</p>
      <p>productCategory:{item.productCategory},</p>
      <p>quantity:{item.quantity} <input type="button" value="+" /><input type="button" value="-" /></p>
      <p>price:{item.price}</p>
    </div>
  );
};
export const ClearCheckoutCartButton = ({
  handleClearCheckoutCart,
  handleToggleIsCheckoutCartOpen,
  searchTextState,
}) => {
  const setSearchText = searchTextState[1];
  return (
    <article style={{ display: "flex", gap: "0.125rem" }}>
      <button onClick={() => handleClearCheckoutCart()}>clear</button>
      <button
        style={{ color: "white", backgroundColor: "red" }}
        onClick={() => handleToggleIsCheckoutCartOpen()}
      >
        X
      </button>
      <input
        type="search"
        style={{ height: "1.5rem", width: "9.3rem" }}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button>search</button>
    </article>
  );
};

export const CheckoutPage = () => {
  const {
    globalState,
    handleClearCheckoutCart,
    handleDeleteItemFromCheckoutCart,
    handleToggleIsCheckoutCartOpen,
    handleSearchCheckoutItems,
    setSearchText
  } = ShoppingCartStateGlobalContextData();
  {/*useEffect(() => {},[]);*/}
  const {
    isCheckoutCartOpen,
    allCheckoutProducts,
    allCheckoutProductsFiltered,
    isAllCheckoutProductsFiltered,
    searchText
  } = globalState;
  const readyToBuyItems = allCheckoutProducts;

  return (
    <div
      style={{
        display: `${isCheckoutCartOpen ? "flex" : "none"}`,
        flexDirection: "column",
        width: "25%",
        gap: "1rem",
        padding: "0.1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "25%",
          padding: "1rem",
          alignContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <ClearCheckoutCartButton
          searchTextState={[searchText,setSearchText]}
          handleSearchCheckoutItems={handleSearchCheckoutItems}
          handleClearCheckoutCart={handleClearCheckoutCart}
          handleToggleIsCheckoutCartOpen={handleToggleIsCheckoutCartOpen}
        />
      </div>
        {isAllCheckoutProductsFiltered === false && 
        <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {allCheckoutProducts &&
              allCheckoutProducts.map((allCheckoutProduct, index) => (
                <ReadyToBuyItem
                  key={index}
                  item={allCheckoutProduct}
                  handleDeleteThisItem={handleDeleteItemFromCheckoutCart}
                />
              ))}
          </div>}
          
          {isAllCheckoutProductsFiltered === true && 
            <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {allCheckoutProductsFiltered &&
              allCheckoutProductsFiltered.map((allCheckoutProduct, index) => (
                <ReadyToBuyItem
                  key={index}
                  item={allCheckoutProduct}
                  handleDeleteThisItem={handleDeleteItemFromCheckoutCart}
                />
              ))}
          </div>
          }
    </div>
  );
};
