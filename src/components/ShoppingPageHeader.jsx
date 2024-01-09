import React from 'react'

export const ShoppingPageHeader = () => {
  return (
    <div style={{position:"fixed",top:"0px",left:"0px",padding:"1rem",height:"fit-content",width:"99vw", outline:"1px solid black"}}>
      <ol style={{display:"flex",flexGrow:"initial",flexWrap:"wrap",flexShrink:"initial",flexDirection:"row",flexFlow:"row",listStyleType:"none",gap:"1rem"}}>
        <li style={{outline:"1px solid black",padding:"1rem 3rem",borderRadius:"1.5rem",cursor:"pointer"}}><article>Home</article></li>
        <li style={{outline:"1px solid black",padding:"1rem 3rem",borderRadius:"1.5rem",cursor:"pointer"}}><article>Products</article></li>
        <li style={{outline:"1px solid black",padding:"1rem 3rem",borderRadius:"1.5rem",cursor:"pointer"}}><article>Checkout</article></li>
      </ol>
    </div>
  )
}
