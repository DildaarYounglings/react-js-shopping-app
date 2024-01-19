import React from 'react';
import './App.css';
import { ShopingCartStateProvider, ShoppingCartStateGlobalContextData } from './context/ShopingCartState';
import { ShoppingPage } from './components/ShoppingPage';

function App() {
  return (
  <ShopingCartStateProvider>
    <ShoppingPage/>
  </ShopingCartStateProvider>
  )
}

export default App
