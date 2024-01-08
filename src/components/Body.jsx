import React, { useState } from "react";

export const Body = () => {
  const initialState = [
    { productName: "banana", productCategory: "fruit", price: 10 },
    { productName: "apple", productCategory: "fruit", price: 5 },
  ];
  const [shoppingCartItems, setShoppingCartItems] = useState(initialState);
  const [readyToBuy, setReadyToBuy] = useState([]);
  const checkIfCartHasTheSameItem = (product) => {
    const allItemsToCheck = readyToBuy.map((item) => item.productName);
    let result = allItemsToCheck.includes(product.productName);
    return result;
  }
  const addToCart = (product) => {
    if(checkIfCartHasTheSameItem(product) === false){
        let copy = [...readyToBuy,product];
        setReadyToBuy(copy);
    }
    console.log(readyToBuy);
  }
  return (
    <div>
      {shoppingCartItems.map((object, index) => (
        <React.Fragment key={index}>
          <div style={{outline:"1px solid cyan"}}>
            <p>productName: {object.productName},</p>productCategory:{object.productCategory},<p></p><p>price:{object.price}</p>
            <button onClick={() => addToCart(object)}>Add</button>
          </div>
        </React.Fragment>
      ))}
      {readyToBuy && readyToBuy.map((object, index) => (
        <React.Fragment key={index}>
          <div style={{outline:"1px solid green"}}>
            <p>productName: {object.productName},</p><p>productCategory:{object.productCategory},</p><p>price:{object.price}</p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
