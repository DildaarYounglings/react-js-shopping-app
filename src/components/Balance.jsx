import React from 'react'
import { GlobalContextData } from '../context/GlobalState'

export const Balance = () => {
  const {transactions} = GlobalContextData();
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
  return (
    <>
        <h4>YOUR BALANCE</h4>
        <h1 id="balance">${total}</h1>
    </>
  )
}
