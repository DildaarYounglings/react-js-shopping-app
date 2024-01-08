import React, { useState } from 'react'

export const Body = () => {
    const initialState = [{productName:"banana",productCategory:"fruit",price:10},{productName:"apple",productCategory:"fruit",price:5}]
    const [shoppingCartItems,setShoppingCartItems] = useState(initialState);
  return (
    <div>
        {shoppingCartItems.map((object,index) => <React.Fragment key={index}>
                <div>
                    {"{ "}productName: {object.productName}, productCategory:{object.productCategory}, price:{object.price}{" }"}
                </div>
            </React.Fragment>
        )}
    </div>
  )
}
