import React, { useEffect, useState } from "react";
import { ShoppingCartStateGlobalContextData } from "../context/ShopingCartState";

export const ReadyToBuyItem = ({
  item,
  handleDeleteThisItem,
  handleIncrementQuantity,
  handleDecrementQuantity,
}) => {
  if (!item) {
    console.log(item);
    return <div>nothing is appearing</div>;
  }
  return (
    <div className="ReadyToBuyItem">
      <button onClick={() => handleDeleteThisItem(item)}>Remove</button>
      <p>productName: {item.productName},</p>
      <p>productCategory:{item.productCategory},</p>
      <p>
        quantity:{item.quantity}{" "}
        <input
          type="button"
          value="+"
          onClick={() => {
            handleIncrementQuantity(item,1);
          }}
        />
        <input
          type="button"
          value="-"
          onClick={() => {
            handleDecrementQuantity(item,1);
          }}
        />
      </p>
      <p>price:{item.price}</p>
    </div>
  );
};
export const ClearCheckoutCartButton = ({
  handleClearCheckoutCart,
  handleToggleIsCheckoutCartOpen,
  searchTextState,
  globalState,
  setGlobalState,
  isAllCheckoutProductsFiltered,
}) => {
  const searchText = searchTextState[0];
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
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        onClick={() =>
          setGlobalState({
            ...globalState,
            isAllCheckoutProductsFiltered: !isAllCheckoutProductsFiltered,
          })
        }
      >
        toggle search view
      </button>
    </article>
  );
};

export const CheckoutPage = () => {
  const {
    globalState,
    setGlobalState,
    handleCalculatePrice,
    handleIncrementProductQuantity,
    handleDecrementProductQuantity,
    handleClearCheckoutCart,
    handleDeleteItemFromCheckoutCart,
    handleToggleIsCheckoutCartOpen,
    setSearchText,
  } = ShoppingCartStateGlobalContextData();

  const {
    isCheckoutCartOpen,
    allCheckoutProducts,
    allCheckoutProductsFiltered,
    isAllCheckoutProductsFiltered,
    searchText,
    allCheckoutProductsPrice
  } = globalState;
  useEffect(() => {
    setGlobalState((g) =>{
      return {
        ...g,
        allCheckoutProductsFiltered: [...allCheckoutProducts].filter(
          (item, index) =>
            item.productName.toUpperCase().includes(searchText.toUpperCase())
        ),
      };
    });
  }, [allCheckoutProducts, searchText]);
  const isCheckoutProductsFiltered = isAllCheckoutProductsFiltered;

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
          searchTextState={[searchText, setSearchText]}
          setGlobalState={setGlobalState}
          globalState={globalState}
          isAllCheckoutProductsFiltered={isAllCheckoutProductsFiltered}
          handleClearCheckoutCart={handleClearCheckoutCart}
          handleToggleIsCheckoutCartOpen={handleToggleIsCheckoutCartOpen}
        />
      </div>

      {isCheckoutProductsFiltered === true ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {allCheckoutProductsFiltered &&
            allCheckoutProductsFiltered.map(
              (allCheckoutProductFiltered, index) => (
                <div key={index} className="ReadyToBuyItem">
                  <p>productName: {allCheckoutProductFiltered.productName},</p>
                  <p>
                    productCategory:{allCheckoutProductFiltered.productCategory}
                    ,
                  </p>
                  <p>price:{allCheckoutProductFiltered.price}</p>
                </div>
              )
            )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {allCheckoutProducts &&
            allCheckoutProducts.map((allCheckoutProduct, index) => (
              <ReadyToBuyItem
                key={index}
                handleIncrementQuantity={handleIncrementProductQuantity}
                handleDecrementQuantity={handleDecrementProductQuantity}
                item={allCheckoutProduct}
                handleDeleteThisItem={handleDeleteItemFromCheckoutCart}
              />
            ))}
        </div>
      )}
      <button onClick={() => handleCalculatePrice()}>calculate price</button><span style={{color:"white"}}>total: $ {allCheckoutProductsPrice}</span>
    </div>
  );
};
