import React, { useState } from "react";

export const Body = () => {
  const initialState = [
    { productName: "banana", productCategory: "fruit", price: 10 },
    { productName: "apple", productCategory: "fruit", price: 5 },
  ];
  const [shoppingCartItems, setShoppingCartItems] = useState(initialState);
  const [readyToBuy, setReadyToBuy] = useState([]);
  const checkIfCartHasTheSameItem = (product) => {
    if(!product){return}
    const allItemsToCheck = readyToBuy.map((item) => item.productName);
    allItemsToCheck.forEach((item) => {
        if(item === product.productName){
            return false
        }else{
            return true
        }
    })
    }
  }
  const addToCart = (product) => {
    if(checkIfCartHasTheSameItem(product)){
        let copy = [...readyToBuy,product];
        setReadyToBuy(copy);
    }
    console.log(readyToBuy);
  }
  return (
    <div style={{outline:"1px solid blue"}}>
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
            {"{ "}productName: {object.productName}, productCategory:{object.productCategory}, price:{object.price}{" }"}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
