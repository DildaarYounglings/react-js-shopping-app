import React, { useEffect, useRef} from "react";
import { ShoppingCartStateGlobalContextData } from "../context/ShopingCartState";
import { ShoppingPageHeader } from "./ShoppingPageHeader";
import { ShoppingPageFooter } from "./ShoppingPageFooter";

export const ShoppingCartItem = ({item,addToCart}) => {
  const dialogRef = useRef();
  const open = () => {
    dialogRef.current.showModal()
  };
  const close = () => {
    dialogRef.current.close()
  }
  return (
    <div className="ShoppingCartItem">
      <p>{item.productName}</p><p>price:{item.price}</p>
      <button onClick={() => addToCart(item)}>Add</button><button onClick={() => open()}>Comment</button>
      <dialog ref={dialogRef} style={{}}>
        <ul style={{listStyleType:"none",display:"flex",flexDirection:"column",translate:"-3rem -1rem"}}>
          <li onClick={() => close()}>
            <p style={{fontSize:"1.19rem",fontWeight:"lighter",fontStyle:"italic"}}>
              Comments
            </p>
          </li>
        </ul>
        <ul>
          {item.Comments.map((comment,index) => <li key={index}>
            <p style={{fontSize:"1.1rem",fontWeight:"lighter",fontStyle:"italic"}}>{comment.username}</p>
            <article>
              {comment.content}
            </article>
          </li>)}
        </ul>
      </dialog>
    </div>
  )
}


export const ShoppingPage = () => {
  const {globalState,handleAddToCheckoutCart,handlSetAllShopProducts} = ShoppingCartStateGlobalContextData();
  const shoppingCartItems = globalState.allShopProducts;
  useEffect(() => {
    const getData = async() => {
      const data = await fetch('/api/products').then(res => res.json());
      console.log(data);
      handlSetAllShopProducts(data);
    };
    getData();
  },[])
  return (
    <>
    <ShoppingPageHeader/>
    <div style={{ position: "absolute",left:"0px",top:"100px", display: "flex", flexDirection: "column",overflowY:"scroll",height:"fit-content",width:"100%",padding:"1rem",gap:"1rem"}}>
      <div style={{display:"grid",gap:"3rem",gridTemplateColumns:"14% 14% 14%"}}>
        {shoppingCartItems && shoppingCartItems.map((object, index) => (
          <ShoppingCartItem key={index} item={object} addToCart={handleAddToCheckoutCart}/>
        ))}
      </div>
      <ShoppingPageFooter/>
    </div>
    </>
  );
};